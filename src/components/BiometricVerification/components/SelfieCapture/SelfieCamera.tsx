import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SelfieCameraProps {
  onCapture: (selfieData: string) => void;
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

const GuideOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  '& .guide-circle': {
    width: '200px',
    height: '200px',
    border: '2px solid #fff',
    borderRadius: '50%',
    opacity: 0.7
  }
}));

export const SelfieCamera: React.FC<SelfieCameraProps> = ({ onCapture, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);

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
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setStream(mediaStream);
      setIsLoading(false);

      // TODO: Inizializza face detection
      // Per ora simuliamo il rilevamento del volto dopo 2 secondi
      setTimeout(() => setFaceDetected(true), 2000);

    } catch (err) {
      console.error('Errore fotocamera:', err);
      setError('Errore durante l\'inizializzazione della fotocamera');
      setIsLoading(false);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !faceDetected) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const selfieData = canvas.toDataURL('image/jpeg', 0.9);
      onCapture(selfieData);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Scatta un selfie
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Posiziona il viso all'interno del cerchio e mantieni un'espressione neutra
      </Typography>

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
          <>
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
            <GuideOverlay>
              <div className="guide-circle" />
            </GuideOverlay>
          </>
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
        >
          Indietro
        </Button>
        <Button
          variant="contained"
          onClick={handleCapture}
          disabled={!faceDetected || isLoading}
        >
          Scatta Selfie
        </Button>
      </Box>

      {!faceDetected && !isLoading && !error && (
        <Typography 
          sx={{ 
            mt: 2, 
            textAlign: 'center',
            color: 'warning.main'
          }}
        >
          Posiziona il viso all'interno del cerchio
        </Typography>
      )}
    </Box>
  );
}; 