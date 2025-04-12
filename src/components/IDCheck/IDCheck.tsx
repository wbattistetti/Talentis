import React, { useState } from 'react';
import { Box, Typography, Stepper, Step, StepLabel, Paper } from '@mui/material';
import { DocumentSelection } from './DocumentSelection';
import DocumentData from './DocumentData';
import PhotoCapture from './PhotoCapture';
import LivenessCheck from './LivenessCheck';

const steps = ['Documento', 'Dati', 'Foto', 'Selfie'];

interface IDCheckProps {
  onCancel: () => void;
}

const IDCheck: React.FC<IDCheckProps> = ({ onCancel }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const [documentData, setDocumentData] = useState<any>({});
  const [photo, setPhoto] = useState<string | null>(null);
  const [livenessResult, setLivenessResult] = useState<boolean>(false);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleDocumentSelect = (document: string) => {
    setSelectedDocument(document);
  };

  const handleDocumentDataSubmit = (data: any) => {
    setDocumentData(data);
  };

  const handlePhotoCapture = (photoData: string) => {
    setPhoto(photoData);
  };

  const handleLivenessCheck = (result: boolean) => {
    setLivenessResult(result);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <DocumentSelection
            onNext={handleNext}
            onDocumentSelect={handleDocumentSelect}
            selectedDocument={selectedDocument}
            onCancel={onCancel}
          />
        );
      case 1:
        return (
          <DocumentData
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleDocumentDataSubmit}
            documentType={selectedDocument}
          />
        );
      case 2:
        return (
          <PhotoCapture
            onNext={handleNext}
            onBack={handleBack}
            onPhotoCapture={handlePhotoCapture}
            documentType={selectedDocument}
          />
        );
      case 3:
        return (
          <LivenessCheck
            onNext={handleNext}
            onBack={handleBack}
            onLivenessCheck={handleLivenessCheck}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Verifica Documento
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStep()}
      </Paper>
    </Box>
  );
};

export default IDCheck; 