import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

interface LivenessCheckProps {
  onNext: () => void;
  onBack: () => void;
  onLivenessCheck: (result: boolean) => void;
}

const LivenessCheck: React.FC<LivenessCheckProps> = ({
  onNext,
  onBack,
  onLivenessCheck,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Impossibile accedere alla fotocamera. Verifica le autorizzazioni.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const performLivenessCheck = async () => {
    if (!videoRef.current) return;

    try {
      setIsLoading(true);
      // Simulate liveness check
      await new Promise(resolve => setTimeout(resolve, 2000));
      onLivenessCheck(true);
      onNext();
    } catch (err) {
      console.error('Error performing liveness check:', err);
      setError('Errore durante la verifica. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Verifica Selfie
      </Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '300px',
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
          overflow: 'hidden',
          mb: 2,
        }}
      >
        {stream ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack}>Indietro</Button>
        <Button
          variant="contained"
          onClick={performLivenessCheck}
          disabled={isLoading || !stream}
        >
          {isLoading ? 'Verifica in corso...' : 'Verifica'}
        </Button>
      </Box>
    </Box>
  );
};

export default LivenessCheck; 