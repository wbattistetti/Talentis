import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { uploadFile } from '../../services/api';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import FileUploadIcon from '@mui/icons-material/FileUpload';

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

  useEffect(() => {
    if (!capturedPhoto) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [capturedPhoto]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
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

  const handleNewPhoto = () => {
    setCapturedPhoto(null);
    setError(null);
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
    if (!videoRef.current) return;

    try {
      setIsLoading(true);
      setError(null);
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Impossibile ottenere il contesto del canvas');
      }

      ctx.drawImage(videoRef.current, 0, 0);
      const photoData = canvas.toDataURL('image/jpeg');
      
      // Convert base64 to blob for upload
      const response = await fetch(photoData);
      const blob = await response.blob();
      const file = new File([blob], 'document.jpg', { type: 'image/jpeg' });

      await uploadFile(file, documentType);
      setCapturedPhoto(photoData);
      onPhotoCapture(photoData);
    } catch (err) {
      console.error('Error capturing photo:', err);
      setError('Errore durante la cattura della foto. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
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
        {isLoading ? (
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
        ) : capturedPhoto ? (
          <img
            src={capturedPhoto}
            alt="Captured"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        ) : stream ? (
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
            <Typography>Camera non disponibile</Typography>
          </Box>
        )}
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Button onClick={onBack}>
          Indietro
        </Button>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          {!capturedPhoto ? (
            <>
              <Button
                variant="outlined"
                onClick={() => fileInputRef.current?.click()}
                startIcon={<FileUploadIcon />}
                disabled={isLoading}
              >
                Carica foto
              </Button>
              <Button
                variant="contained"
                onClick={capturePhoto}
                startIcon={<PhotoCameraIcon />}
                disabled={isLoading || !stream}
              >
                Scatta foto
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={handleNewPhoto}
              startIcon={<PhotoCameraIcon />}
            >
              Nuova foto
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PhotoCapture; 