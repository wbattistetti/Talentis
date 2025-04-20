import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, CircularProgress, Stepper, Step, StepLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

interface VideoRecorderProps {
  onRecord: (videoData: Blob) => void;
  onBack: () => void;
}

const VideoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '600px',
  height: '400px',
  backgroundColor: '#000',
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  margin: '0 auto'
}));

const verificationSteps = [
  {
    label: 'Guarda dritto',
    instruction: 'Guarda direttamente nella telecamera per 3 secondi',
    duration: 3000
  },
  {
    label: 'Gira la testa',
    instruction: 'Gira lentamente la testa da sinistra a destra',
    duration: 5000
  },
  {
    label: 'Sorridi',
    instruction: 'Fai un sorriso naturale',
    duration: 3000
  }
];

export const VideoRecorder: React.FC<VideoRecorderProps> = ({ onRecord, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    initializeCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const initializeCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);
      setIsLoading(false);

    } catch (err) {
      console.error('Errore fotocamera:', err);
      setError('Errore durante l\'inizializzazione della fotocamera');
      setIsLoading(false);
    }
  };

  const startRecording = () => {
    if (!stream) return;

    chunksRef.current = [];
    mediaRecorderRef.current = new MediaRecorder(stream);
    
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const videoBlob = new Blob(chunksRef.current, { type: 'video/webm' });
      onRecord(videoBlob);
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
    setCurrentStep(0);
    startStepCountdown();
  };

  const startStepCountdown = () => {
    const step = verificationSteps[currentStep];
    if (!step) return;

    setCountdown(step.duration / 1000);

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          if (currentStep < verificationSteps.length - 1) {
            setCurrentStep(prev => prev + 1);
            startStepCountdown();
          } else {
            stopRecording();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setCurrentStep(-1);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Video di verifica
      </Typography>

      <Stepper activeStep={currentStep} sx={{ mb: 3 }}>
        {verificationSteps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <VideoContainer>
        {isLoading ? (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%' 
          }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            color: 'error.main'
          }}>
            <Typography>{error}</Typography>
          </Box>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        )}

        {currentStep >= 0 && (
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            bgcolor: 'rgba(0,0,0,0.7)',
            color: 'white'
          }}>
            <Typography align="center">
              {verificationSteps[currentStep].instruction}
            </Typography>
            <Typography align="center" variant="h6">
              {countdown}
            </Typography>
          </Box>
        )}
      </VideoContainer>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        mt: 3 
      }}>
        <Button 
          variant="outlined" 
          onClick={onBack}
          disabled={isRecording}
        >
          Indietro
        </Button>
        <Button
          variant="contained"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isLoading || !!error}
          color={isRecording ? 'error' : 'primary'}
        >
          {isRecording ? 'Stop' : 'Inizia Registrazione'}
        </Button>
      </Box>

      {!isRecording && (
        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          Segui le istruzioni per completare la verifica dell'identità
        </Typography>
      )}
    </Box>
  );
}; 