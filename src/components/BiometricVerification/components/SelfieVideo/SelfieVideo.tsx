import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography, styled } from '@mui/material';
import { audioPlayer } from '../../../../services/audioPlayer';

interface SelfieVideoProps {
  onRecord: (video: Blob) => void;
  onBack: () => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const VideoContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  maxWidth: 500,
  aspectRatio: '4/5',
  overflow: 'hidden',
  borderRadius: 8,
  backgroundColor: '#000',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
});

const Video = styled('video')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transform: 'scaleX(-1)'
});

const Controls = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  gap: theme.spacing(2),
  zIndex: 2
}));

const Instructions = styled(Typography)({
  position: 'absolute',
  top: '40px',
  color: 'white',
  textAlign: 'center',
  width: '100%',
  padding: '0 20px',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  zIndex: 2,
  fontSize: '1.2rem',
  fontWeight: 'bold'
});

const VerificationDialog = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  maxWidth: '400px',
  width: '90%',
});

const steps = [
  'biometric.lookStraight',
  'biometric.turnLeft',
  'biometric.returnCenter1',
  'biometric.turnRight',
  'biometric.returnCenter2',
  'biometric.liftChin',
  'biometric.returnCenter3',
  'biometric.lowerChin',
  'biometric.returnCenter4',
  'biometric.blink',
  'biometric.smile',
  'biometric.finished'
];

// Mapping for recording instructions (command versions)
const recordingInstructions: { [key: string]: string } = {
  'biometric.startInstructions': 'StartingVideo',
  'biometric.lookStraight': 'LookIntoTheCamera',
  'biometric.turnLeft': 'TurnHeadAndLookToLeft',
  'biometric.returnCenter1': 'ReturnToLookIntoTheCamera',
  'biometric.turnRight': 'TurnHeadAndLookToRight',
  'biometric.returnCenter2': 'ReturnToLookIntoTheCamera',
  'biometric.liftChin': 'RiseYouChin',
  'biometric.returnCenter3': 'ReturnToLookIntoTheCamera',
  'biometric.lowerChin': 'DropYourChin',
  'biometric.returnCenter4': 'ReturnToLookIntoTheCamera',
  'biometric.blink': 'BlinkEyes',
  'biometric.smile': 'Smile',
  'biometric.finished': 'PerfectWeHaveFinished'
};

// Mapping for playback instructions (descriptive versions)
const playbackInstructions: { [key: string]: string } = {
  'biometric.startInstructions': 'StartingVideo',
  'biometric.lookStraight': 'YouAreLookingIntoTheCamera',
  'biometric.turnLeft': 'YouAreTurningHeadToASide',
  'biometric.returnCenter1': 'YouAreLookingIntoTheCamera',
  'biometric.turnRight': 'YouAreTurningHeadOtherSide',
  'biometric.returnCenter2': 'YouAreLookingIntoTheCamera',
  'biometric.liftChin': 'YouAreRisingYourChin',
  'biometric.returnCenter3': 'YouAreLookingIntoTheCamera',
  'biometric.lowerChin': 'YouAreDroppingYourChin',
  'biometric.returnCenter4': 'YouAreLookingIntoTheCamera',
  'biometric.blink': 'YourBlinkingYourEyes',
  'biometric.smile': 'YouAreSmiling',
  'biometric.finished': 'PerfectWeHaveFinished'
};

const STEP_DURATION = 3000; // 3 seconds per step
const RETURN_DURATION = 2000; // 2 seconds for return to center

const SelfieVideo: React.FC<SelfieVideoProps> = ({
  onRecord,
  onBack,
  currentStep,
  setCurrentStep,
}) => {
  const { t, i18n } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<Blob | null>(null);
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const chunks = useRef<Blob[]>([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      audioPlayer.stop();
    };
  }, []);

  const speakInstruction = async (text: string, isPlayback: boolean = false) => {
    try {
      setIsPlayingAudio(true);
      const instructions = isPlayback ? playbackInstructions : recordingInstructions;
      const audioFile = instructions[text] || '';
      if (audioFile) {
        await audioPlayer.playAudio(text, i18n.language, audioFile);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  const getStepDuration = (step: string) => {
    return step.includes('returnCenter') ? RETURN_DURATION : STEP_DURATION;
  };

  const getTotalDurationUpToStep = (targetStep: number) => {
    let totalDuration = 0;
    for (let i = 0; i < targetStep; i++) {
      totalDuration += getStepDuration(steps[i]);
    }
    return totalDuration;
  };

  useEffect(() => {
    if (currentStep >= 0 && currentStep < steps.length && isRecording) {
      speakInstruction(steps[currentStep]);

      const timer = setTimeout(() => {
        if (currentStep === steps.length - 1) {
          // When we reach the last step (PerfectWeHaveFinished)
          stopRecording();
        } else {
          setCurrentStep(prev => prev + 1);
        }
      }, getStepDuration(steps[currentStep]));

      return () => {
        clearTimeout(timer);
        audioPlayer.stop();
      };
    }
  }, [currentStep, isRecording, i18n.language]);

  const startRecording = async () => {
    if (stream) {
      chunks.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: 'video/webm' });
        setRecordedVideo(recordedBlob);
        // Start playback automatically after a short delay
        setTimeout(() => playbackVideo(recordedBlob), 500);
      };

      // Speak the initial instruction and wait for it to finish
      await speakInstruction('biometric.startInstructions');
      
      mediaRecorder.start();
      setIsRecording(true);
      setCurrentStep(0);
    }
  };

  const handleVerification = async (isCorrect: boolean) => {
    if (isCorrect && recordedVideo) {
      onRecord(recordedVideo);
    } else {
      setRecordedVideo(null);
      setCurrentStep(-1);
      setShowVerification(false);
    }
  };

  const playbackVideo = async (videoBlob?: Blob) => {
    const blobToPlay = videoBlob || recordedVideo;
    if (blobToPlay && videoRef.current) {
      setIsPlayingBack(true);
      videoRef.current.srcObject = null;
      videoRef.current.src = URL.createObjectURL(blobToPlay);
      
      // Start video playback
      videoRef.current.play();
      
      // Play each instruction with the correct timing
      for (const step of steps) {
        await speakInstruction(step, true);
        await new Promise(resolve => setTimeout(resolve, getStepDuration(step)));
      }
      
      setIsPlayingBack(false);
    }
  };

  const handleBack = () => {
    if (onBack) {
      stopRecording();
      onBack();
    }
  };

  const handleRestart = () => {
    stopRecording();
    setCurrentStep(0);
    speakInstruction(steps[0]);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: 800,
      mx: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        mb: 2
      }}>
        <Typography 
          sx={{ 
            textAlign: 'center',
            fontSize: '1rem',
            lineHeight: 1.5,
            color: 'text.primary'
          }}
        >
          Adesso dovrai fare un breve video di circa 15 secondi. Sentirai dei messaggi e
        </Typography>
        <Typography 
          sx={{ 
            textAlign: 'center',
            fontSize: '1rem',
            lineHeight: 1.5,
            color: 'text.primary'
          }}
        >
          dovrai semplicememte seguire le istruzioni.
        </Typography>
        <Typography 
          sx={{ 
            textAlign: 'center',
            fontSize: '1rem',
            lineHeight: 1.5,
            color: 'text.primary',
            mt: 1
          }}
        >
          Premi Start per partire. Stop e Restart, se occorre.
        </Typography>
      </Box>

      <VideoContainer>
        <Video ref={videoRef} autoPlay playsInline muted />
        
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img 
            src={`/icons/SelfieHead.png?v=${Date.now()}`}
            alt="Sagoma per selfie"
            style={{
              width: '85%',
              height: '85%',
              objectFit: 'contain',
              opacity: 0.8
            }}
          />
        </Box>

        <Instructions>
          {t(steps[currentStep])}
        </Instructions>

        {showVerification && (
          <Box sx={{ 
            position: 'absolute',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 2,
            zIndex: 3
          }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleVerification(false)}
            >
              {t('buttons.incorrect')}
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleVerification(true)}
            >
              {t('buttons.correct')}
            </Button>
          </Box>
        )}
      </VideoContainer>

      <Box sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        mt: 2,
        px: 2
      }}>
        <Button
          variant="contained"
          onClick={handleBack}
          sx={{ 
            minWidth: '120px',
            backgroundColor: '#9e9e9e',
            '&:hover': {
              backgroundColor: '#757575'
            },
            textTransform: 'uppercase'
          }}
        >
          Indietro
        </Button>
        {isRecording ? (
          <Button
            variant="contained"
            onClick={stopRecording}
            sx={{ 
              minWidth: '120px',
              backgroundColor: '#d32f2f',
              '&:hover': {
                backgroundColor: '#c62828'
              },
              textTransform: 'uppercase'
            }}
          >
            Stop
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={startRecording}
            sx={{ 
              minWidth: '120px',
              backgroundColor: recordedVideo ? '#f57c00' : '#2e7d32',
              '&:hover': {
                backgroundColor: recordedVideo ? '#ef6c00' : '#1b5e20'
              },
              textTransform: 'uppercase'
            }}
            disabled={isPlayingBack}
          >
            {recordedVideo ? 'Restart' : 'Start'}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SelfieVideo; 