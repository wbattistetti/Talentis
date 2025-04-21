import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material';
import SelfieCapture from './components/SelfieCapture/SelfieCapture';
import SelfieVideo from './components/SelfieVideo/SelfieVideo';

interface BiometricVerificationProps {
  onComplete: (data: BiometricData) => void;
  onCancel: () => void;
}

interface BiometricData {
  selfie: string;
  verificationVideo: Blob;
}

const steps = [
  'Acquisizione Selfie',
  'Video di Verifica',
  'Completato'
];

export const BiometricVerification: React.FC<BiometricVerificationProps> = ({
  onComplete,
  onCancel
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [biometricData, setBiometricData] = useState<Partial<BiometricData>>({});
  const [videoStep, setVideoStep] = useState(-1);

  const handleSelfieCapture = (selfieData: string) => {
    setBiometricData(prev => ({ ...prev, selfie: selfieData }));
    setActiveStep(1);
  };

  const handleVideoRecord = (videoData: Blob) => {
    const data = {
      ...biometricData,
      verificationVideo: videoData
    } as BiometricData;
    
    setBiometricData(data);
    setActiveStep(2);
    onComplete(data);
  };

  const handleVideoBack = () => {
    setVideoStep(-1);
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Verifica Biometrica
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box>
        {activeStep === 0 && (
          <SelfieCapture
            onCapture={handleSelfieCapture}
            onBack={onCancel}
          />
        )}

        {activeStep === 1 && (
          <SelfieVideo
            onRecord={handleVideoRecord}
            onBack={handleVideoBack}
            currentStep={videoStep}
            setCurrentStep={setVideoStep}
          />
        )}

        {activeStep === 2 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" color="primary" gutterBottom>
              Verifica Completata
            </Typography>
            <Typography variant="body1">
              I tuoi dati biometrici sono stati acquisiti con successo.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}; 