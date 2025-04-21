import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, Typography, RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';
import { CameraAlt as CameraIcon } from '@mui/icons-material';

interface SelfieCaptureProps {
  onCapture: (photoData: string) => void;
  onBack: () => void;
}

const SelfieCapture: React.FC<SelfieCaptureProps> = ({ onCapture, onBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [qualityResponse, setQualityResponse] = useState<string>('');
  const [showLiveView, setShowLiveView] = useState(true);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setIsReady(true);
        }
      } catch (err) {
        console.error("Errore nell'accesso alla fotocamera:", err);
      }
    };

    if (showLiveView) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [showLiveView]);

  const handleQualityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const response = event.target.value;
    setQualityResponse(response);
    
    if (response === 'no') {
      setShowLiveView(true);
      setCapturedPhoto(null);
      setQualityResponse('');
    } else if (response === 'yes' && capturedPhoto) {
      onCapture(capturedPhoto);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        const photoData = canvas.toDataURL('image/jpeg');
        setCapturedPhoto(photoData);
        setShowLiveView(false);
      }
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
      gap: 3
    }}>
      <Typography variant="h5" align="center">
        Allontana o avvicina il cellulare per inquadrare il tuo viso all'interno della sagoma
      </Typography>

      <Box sx={{ 
        position: 'relative',
        width: '100%',
        maxWidth: 500,
        aspectRatio: '4/5',
        overflow: 'hidden',
        borderRadius: 2,
        bgcolor: 'black',
        boxShadow: 3
      }}>
        {showLiveView ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)'
            }}
          />
        ) : (
          <img
            src={capturedPhoto || ''}
            alt="Selfie catturato"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)'
            }}
          />
        )}

        {showLiveView && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(
                ellipse 65% 85% at 50% 45%,
                transparent 45%,
                rgba(0, 0, 0, 0.7) 46%
              )
            `,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                textAlign: 'center',
                transform: 'translateY(-20px)'
              }}
            >
              Guarda dritto con espressione neutra
            </Typography>
          </Box>
        )}

        <canvas
          ref={canvasRef}
          style={{ display: 'none' }}
        />
      </Box>

      {capturedPhoto && !showLiveView && (
        <FormControl component="fieldset">
          <Typography variant="body1" gutterBottom align="center">
            La foto è a fuoco?
          </Typography>
          <RadioGroup
            row
            name="quality-response"
            value={qualityResponse}
            onChange={handleQualityChange}
            sx={{ justifyContent: 'center', gap: 2 }}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Sì" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      )}

      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 500,
        px: 2
      }}>
        <Button 
          variant="outlined"
          onClick={onBack}
          sx={{ minWidth: 120 }}
        >
          Indietro
        </Button>
        
        {showLiveView && (
          <Button
            variant="contained"
            onClick={capturePhoto}
            disabled={!isReady}
            startIcon={<CameraIcon />}
            sx={{ minWidth: 120 }}
          >
            Scatta Selfie
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SelfieCapture; 