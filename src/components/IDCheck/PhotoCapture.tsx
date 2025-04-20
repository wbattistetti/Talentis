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
import { useTranslation } from 'react-i18next';

interface PhotoCaptureProps {
  onPhotoCapture: (photoData: string) => void;
  onNext: () => void;
  onBack: () => void;
  documentType: string;
  isFront?: boolean; // true per il fronte, false per il retro
  customTitle?: string; // titolo personalizzato opzionale
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({
  onPhotoCapture,
  onNext,
  onBack,
  documentType,
  isFront = true, // default a true per retrocompatibilità
  customTitle
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [photoVerificationState, setPhotoVerificationState] = useState<'initial' | 'verified' | 'rejected'>('initial');
  const [qualityResponse, setQualityResponse] = useState<string>('');
  const [showLiveView, setShowLiveView] = useState(true);
  const [lastCapturedPhoto, setLastCapturedPhoto] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const initCamera = async () => {
      try {
        console.log('Initializing camera with document type:', documentType);
        setIsLoading(true);
        setError(null);
        setShowLiveView(true);

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('La fotocamera non è supportata su questo browser');
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true
        });

        console.log('Camera stream obtained:', !!mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          console.log('Video element source set');
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

  // Reset dello stato quando si passa da fronte a retro
  useEffect(() => {
    console.log('Switching to', isFront ? 'front' : 'back', 'side');
    setCapturedPhoto(null);
    setQualityResponse('');
    setShowLiveView(true);
    setPhotoVerificationState('initial');
    
    // Riattiva lo stream se necessario
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [isFront]);

  const handlePhotoQualityResponse = (isGood: boolean) => {
    if (isGood) {
      setPhotoVerificationState('verified');
      setShowLiveView(false);
    } else {
      setPhotoVerificationState('rejected');
      setShowLiveView(true);
    }
  };

  const handleNewPhoto = () => {
    setCapturedPhoto(null);
    setError(null);
    setPhotoVerificationState('initial');
    setShowLiveView(true);
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
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
      setQualityResponse(''); // Reset radio button selection

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
      // Assicuriamoci che lo stream sia attivo
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } else {
      setShowLiveView(false);
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
              documentType === 'idCard' ? 'IdCard' :
              documentType === 'passport' ? 'Passport' :
              'DriverLicense'
            }.png`}
            alt={documentType}
            style={{ width: 24, height: 24 }}
          />
          <Typography 
            sx={{ 
              fontSize: '1rem',
              fontWeight: 500,
              color: '#1a1a1a'
            }}
          >
            {customTitle || (isFront ? t('photoCapture.frontTitle') : t('photoCapture.backTitle'))} {
              !customTitle && (
                documentType === 'idCard' ? t('documents.idCard') :
                documentType === 'passport' ? t('documents.passport') :
                t('documents.driverLicense')
              )
            }
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
            <>
              {/* Live Stream - sempre visibile ma può essere coperto */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 1
                }}
              />

              {/* Riquadro foto - si sovrappone al live stream quando presente */}
              {capturedPhoto && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000',
                    opacity: showLiveView ? 0 : 1,
                    transition: 'opacity 0.3s ease-in-out',
                    pointerEvents: showLiveView ? 'none' : 'auto',
                    zIndex: 2
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
            </>
          )}
        </Box>

        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Pulsanti principali */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              variant="outlined" 
              onClick={onBack}
              sx={{ minWidth: 120 }}
            >
              {t('buttons.back')}
            </Button>
            
            {/* Mostra "Scatta" se non c'è ancora una foto */}
            {!capturedPhoto && (
              <Button 
                variant="contained"
                onClick={capturePhoto}
                sx={{ minWidth: 120 }}
              >
                {t('buttons.capture')}
              </Button>
            )}

            {/* Mostra "Avanti" se la foto è stata verificata (qualityResponse === 'yes') */}
            {capturedPhoto && qualityResponse === 'yes' && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => onPhotoCapture(capturedPhoto)}
                sx={{ minWidth: 120 }}
              >
                {t('buttons.next')}
              </Button>
            )}

            {/* Mostra "Scatta di nuovo" se la foto è stata rifiutata (qualityResponse === 'no') */}
            {capturedPhoto && qualityResponse === 'no' && (
              <Button 
                variant="contained"
                onClick={capturePhoto}
                sx={{ minWidth: 120 }}
              >
                {t('buttons.capture')}
              </Button>
            )}
          </Box>

          {/* Domanda sulla qualità della foto - sempre visibile dopo il primo scatto */}
          {capturedPhoto && (
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              gap: 1
            }}>
              <Typography sx={{ 
                fontSize: '0.9rem',
                textAlign: 'center'
              }}>
                La foto è a fuoco e ben visibile?
              </Typography>

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
            </Box>
          )}
        </Box>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default PhotoCapture; 