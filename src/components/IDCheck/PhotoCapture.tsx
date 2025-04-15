import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, CircularProgress, RadioGroup, FormControlLabel, Radio, FormControl, IconButton, Slider } from '@mui/material';
import { uploadFile } from '../../services/api';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';

interface PhotoCaptureProps {
  onNext: () => void;
  onBack: () => void;
  onPhotoCapture: (photo: string) => void;
  documentType: string;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({
  onNext,
  onBack,
  onPhotoCapture,
  documentType,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [photoVerificationState, setPhotoVerificationState] = useState<'initial' | 'verified' | 'rejected'>('initial');
  const [qualityResponse, setQualityResponse] = useState<string>('');
  const [showLiveView, setShowLiveView] = useState(false);
  const [lastCapturedPhoto, setLastCapturedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('La fotocamera non è supportata su questo browser');
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true
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

    initCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handlePhotoQualityResponse = (isGood: boolean) => {
    if (isGood) {
      setPhotoVerificationState('verified');
    } else {
      setPhotoVerificationState('rejected');
    }
  };

  const handleNewPhoto = () => {
    setCapturedPhoto(null);
    setError(null);
    setPhotoVerificationState('initial');
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      setError(null);

      // Verifica che il file sia un'immagine
      if (!file.type.startsWith('image/')) {
        throw new Error('Il file selezionato non è un\'immagine');
      }

      // Converti il file in base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const photoData = e.target?.result as string;
        try {
          await uploadFile(file, documentType);
          setCapturedPhoto(photoData);
          onPhotoCapture(photoData);
        } catch (err) {
          console.error('Error uploading file:', err);
          setError('Errore durante il caricamento del file. Riprova.');
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error processing file:', err);
      setError('Errore durante l\'elaborazione del file. Riprova.');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !stream) {
      setError('Fotocamera non disponibile. Riprova.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setPhotoVerificationState('initial');

      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Impossibile creare il contesto del canvas');
      }

      ctx.drawImage(videoRef.current, 0, 0);
      const photoData = canvas.toDataURL('image/jpeg', 0.9);

      const file = new File([await (await fetch(photoData)).blob()], 'document.jpg', { type: 'image/jpeg' });
      await uploadFile(file, documentType);
      
      setCapturedPhoto(photoData);
      setLastCapturedPhoto(photoData);
      setShowLiveView(false);
      
    } catch (err) {
      console.error('Error capturing photo:', err);
      setError('Errore durante la cattura della foto. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQualityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQualityResponse(value);
    
    if (value === 'no') {
      setShowLiveView(true);
      setPhotoVerificationState('initial');
    } else {
      setShowLiveView(false);
      handlePhotoQualityResponse(true);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '533px',
          backgroundColor: '#fff',
          borderRadius: 2,
          overflow: 'visible',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          border: '1px solid #e0e0e0'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2, 
          p: 2,
          borderBottom: '1px solid #e0e0e0'
        }}>
          <img
            src={`/icons/${
              documentType === 'Carta d\'identità' ? 'IdCard' :
              documentType === 'Passaporto' ? 'Passport' :
              'DriverLicense'
            }.png`}
            alt={documentType}
            style={{ width: 40, height: 40 }}
          />
          <Typography 
            sx={{ 
              fontSize: '1rem',
              fontWeight: 500,
              color: '#1a1a1a'
            }}
          >
            Foto fronte {documentType}
          </Typography>
        </Box>

        <Box sx={{
          width: '533px',
          height: '300px',
          position: 'relative',
          backgroundColor: '#000',
          overflow: 'hidden'
        }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: 2,
              color: 'error.main'
            }}>
              <VideocamOffIcon sx={{ fontSize: 48 }} />
              <Typography variant="h6">
                Fotocamera non disponibile
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Apri il coperchio o usa una webcam esterna
              </Typography>
            </Box>
          ) : (
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  visibility: showLiveView || !capturedPhoto ? 'visible' : 'hidden'
                }}
              />
              {capturedPhoto && !showLiveView && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#000',
                    zIndex: 1
                  }}
                >
                  <img
                    src={capturedPhoto}
                    alt="Captured"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          width: '100%',
          borderTop: '1px solid #e0e0e0'
        }}>
          <Button
            variant="outlined"
            onClick={onBack}
            startIcon={<ArrowBackIcon />}
          >
            INDIETRO
          </Button>

          {(showLiveView || !capturedPhoto) && (
            <Button
              variant="contained"
              color="primary"
              onClick={capturePhoto}
              startIcon={<PhotoCameraIcon />}
              disabled={!stream || isLoading}
            >
              {showLiveView ? 'SCATTA DI NUOVO' : 'SCATTA'}
            </Button>
          )}
        </Box>
      </Box>

      {capturedPhoto && (
        <Box sx={{ 
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          gap: 1,
          pb: 2
        }}>
          <Typography sx={{ 
            fontSize: '0.9rem',
            textAlign: 'center'
          }}>
            La foto è a fuoco? Riesci a leggere bene tutte le scritte?
          </Typography>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            justifyContent: 'center'
          }}>
            <FormControl>
              <RadioGroup
                row
                value={qualityResponse}
                onChange={handleQualityChange}
                sx={{
                  justifyContent: 'center',
                  '& .MuiFormControlLabel-root': {
                    mr: 3,
                    mb: 0
                  }
                }}
              >
                <FormControlLabel 
                  value="yes" 
                  control={<Radio size="small" />} 
                  label="Sì" 
                />
                <FormControlLabel 
                  value="no" 
                  control={<Radio size="small" />} 
                  label="No" 
                />
              </RadioGroup>
            </FormControl>

            {photoVerificationState === 'verified' && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => onPhotoCapture(capturedPhoto)}
                sx={{ 
                  minWidth: 160,
                  height: 32,
                  fontSize: '0.9rem'
                }}
              >
                Avanti
              </Button>
            )}
          </Box>
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default PhotoCapture; 