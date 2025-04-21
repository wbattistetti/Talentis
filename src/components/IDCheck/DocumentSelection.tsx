import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, IconButton, Tooltip, Container, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemIcon, ListItemText, Link, Paper, Grid } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { IDCardForm } from './IDCardForm';
import { PassportForm } from './PassportForm';
import { DriverLicenseForm } from './DriverLicenseForm';
import PhotoCapture from './PhotoCapture';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import DescriptionIcon from '@mui/icons-material/Description';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { VerificationDialog } from './VerificationDialog';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PublicIcon from '@mui/icons-material/Public';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { CreditCard as IdCardIcon, DriveEta as DriversLicenseIcon, Assignment as PassportIcon } from '@mui/icons-material';
import BiometricPopup from '../BiometricVerification/BiometricPopup';
import { BiometricVerification } from '../BiometricVerification/BiometricVerification';

interface DocumentSelectionProps {
  onCancel: () => void;
  translations: any;
  onComplete: (data: DocumentsData) => void;
}

interface PersonalData {
  nome?: string;
  cognome?: string;
  dataNascita?: string;
  numeroDocumento?: string;
  numeroPassaporto?: string;
  numeroPatente?: string;
  dataScadenza?: string;
}

interface DocumentData {
  personalData?: PersonalData;
  frontPhoto?: string;
  backPhoto?: string;
}

type DocumentsData = {
  [key: string]: DocumentData;
};

type DocumentType = 'idCard' | 'passport' | 'driversLicense';

export const DocumentSelection = ({ onCancel, translations, onComplete }: DocumentSelectionProps) => {
  const [selectedDocuments, setSelectedDocuments] = React.useState<string[]>([]);
  const [showForm, setShowForm] = React.useState(false);
  const [currentFormIndex, setCurrentFormIndex] = React.useState(0);
  const [isCapturingPhoto, setIsCapturingPhoto] = React.useState(false);
  const [isCapturingBack, setIsCapturingBack] = React.useState(false);
  const [documentsData, setDocumentsData] = React.useState<DocumentsData>({});
  const [showWelcomeDialog, setShowWelcomeDialog] = React.useState(true);
  const [showProceedButton, setShowProceedButton] = React.useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [qualityResponse, setQualityResponse] = useState('');
  const [showLiveView, setShowLiveView] = useState(true);
  const [showBiometricPopup, setShowBiometricPopup] = useState(false);
  const [showBiometricVerification, setShowBiometricVerification] = useState(false);

  console.log('DocumentSelection rendering with:', {
    showWelcomeDialog,
    showForm,
    selectedDocuments,
    translations: !!translations
  });

  const handleDocumentSelect = (documentType: DocumentType) => {
    setSelectedDocuments(prev => {
      if (prev.includes(documentType)) {
        return prev.filter(doc => doc !== documentType);
      }
      return [...prev, documentType];
    });
  };

  const handleNext = () => {
    console.log('handleNext called with state:', {
      showForm,
      isCapturingPhoto,
      isCapturingBack,
      currentFormIndex,
      selectedDocuments,
      currentDoc: selectedDocuments[currentFormIndex]
    });

    if (!showForm) {
      // Primo step: mostra il form del primo documento
      setShowForm(true);
    } else if (!isCapturingPhoto) {
      // Secondo step: inizia la cattura della foto frontale
      setIsCapturingPhoto(true);
      setIsCapturingBack(false);
    } else if (!isCapturingBack && needsBackPhoto(selectedDocuments[currentFormIndex])) {
      // Terzo step: se necessario, cattura il retro
      setIsCapturingBack(true);
    } else {
      // Quarto step: passa al prossimo documento se disponibile
      if (currentFormIndex < selectedDocuments.length - 1) {
        setCurrentFormIndex(prev => prev + 1);
        setIsCapturingPhoto(false);
        setIsCapturingBack(false);
        setShowForm(true);
      } else {
        // Processo completato, passa alla verifica biometrica
        console.log('Processo documenti completato, dati:', documentsData);
        onComplete(documentsData);
      }
    }
  };

  const handleBack = () => {
    onCancel();
  };

  const handleDataChange = (data: Partial<PersonalData>) => {
    const currentDoc = selectedDocuments[currentFormIndex];
    setDocumentsData(prev => ({
      ...prev,
      [currentDoc]: {
        ...prev[currentDoc],
        personalData: {
          ...(prev[currentDoc]?.personalData || {}),
          ...data
        }
      }
    }));
  };

  const handlePhotoCapture = (photoData: string) => {
    const currentDoc = selectedDocuments[currentFormIndex];
    console.log('handlePhotoCapture called for document:', {
      currentDoc,
      isCapturingBack,
      currentFormIndex
    });

    // Salva la foto nel documento corrente
    const updatedDocumentsData = {
      ...documentsData,
      [currentDoc]: {
        ...documentsData[currentDoc],
        [isCapturingBack ? 'backPhoto' : 'frontPhoto']: photoData
      }
    };
    setDocumentsData(updatedDocumentsData);

    // Verifica se questa è l'ultima foto da catturare
    const isLastDocument = currentFormIndex === selectedDocuments.length - 1;
    const isLastPhoto = isCapturingBack || !needsBackPhoto(currentDoc);

    if (isLastDocument && isLastPhoto) {
      // Se questa è l'ultima foto, mostra il popup biometrico invece di completare subito
      setShowBiometricPopup(true);
    } else {
      // Altrimenti procedi al prossimo step
      handleNext();
    }
  };

  const handleBiometricPopupClose = () => {
    setShowBiometricPopup(false);
  };

  const handleBiometricPopupProceed = () => {
    setShowBiometricPopup(false);
    setShowBiometricVerification(true);
  };

  const handleBiometricComplete = (biometricData: any) => {
    // Combina i dati dei documenti con i dati biometrici
    const completeData = {
      documents: documentsData,
      biometric: biometricData
    };
    onComplete(completeData);
  };

  const needsBackPhoto = (documentType: string) => {
    return documentType === 'idCard' || documentType === 'driversLicense';
  };

  const getNextButtonText = () => {
    return translations.verification.buttons.next;
  };

  const getDocumentTitle = (documentType: string) => {
    switch (documentType) {
      case 'id':
        return translations.verification.documents.idCard;
      case 'passport':
        return translations.verification.documents.passport;
      case 'driverLicense':
        return translations.verification.documents.driverLicense;
      default:
        return '';
    }
  };

  const getCurrentContent = () => {
    const currentDoc = selectedDocuments[currentFormIndex];
    const currentData = documentsData[currentDoc];

    console.log('getCurrentContent called with:', {
      currentDoc,
      currentData,
      selectedDocuments,
      currentFormIndex,
      isCapturingPhoto,
      isCapturingBack,
      showForm
    });

    if (isCapturingPhoto) {
      return (
        <Box>
          <PhotoCapture 
            onPhotoCapture={handlePhotoCapture}
            onNext={handleNext}
            onBack={handleBack}
            documentType={currentDoc}
            isFront={!isCapturingBack}
          />
        </Box>
      );
    }

    switch (currentDoc) {
      case 'idCard':
        return <IDCardForm 
          onDataChange={handleDataChange}
          personalData={currentData?.personalData}
          onBack={() => setShowForm(false)}
          onNext={() => setIsCapturingPhoto(true)}
        />;
      case 'passport':
        return <PassportForm 
          onDataChange={handleDataChange} 
          personalData={currentData?.personalData}
          onBack={() => setShowForm(false)}
          onNext={() => setIsCapturingPhoto(true)}
        />;
      case 'driversLicense':
        return <DriverLicenseForm 
          onDataChange={handleDataChange} 
          personalData={currentData?.personalData}
          onBack={() => setShowForm(false)}
          onNext={() => setIsCapturingPhoto(true)}
        />;
      default:
        console.log('No matching document type found');
        return null;
    }
  };

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const isAtBottom = scrollHeight - scrollTop <= clientHeight + 20;
      setShowProceedButton(isAtBottom);
    }
  };

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
      // Check initial scroll position
      handleScroll();
      return () => content.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const documents = [
    {
      type: 'idCard' as DocumentType,
      icon: <IdCardIcon sx={{ color: '#4CAF50', fontSize: 64 }} />,
      title: translations?.documents?.idCard || 'Carta d\'identità',
      description: 'Documento di identità nazionale'
    },
    {
      type: 'passport' as DocumentType,
      icon: <PassportIcon sx={{ color: '#2196F3', fontSize: 64 }} />,
      title: translations?.documents?.passport || 'Passaporto',
      description: 'Documento per viaggi internazionali'
    },
    {
      type: 'driversLicense' as DocumentType,
      icon: <DriversLicenseIcon sx={{ color: '#9C27B0', fontSize: 64 }} />,
      title: translations?.documents?.driverLicense || 'Patente di guida',
      description: 'Documento di guida e identità'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {showBiometricVerification ? (
        <BiometricVerification
          onComplete={handleBiometricComplete}
          onCancel={() => setShowBiometricVerification(false)}
        />
      ) : (
        <>
          <VerificationDialog 
            open={showWelcomeDialog} 
            onClose={() => {
              console.log('Dialog closing');
              setShowWelcomeDialog(false);
            }}
            translations={translations}
          />

          {!showWelcomeDialog && !showForm && (
            <>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 600,
                  color: '#1976d2',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  {translations?.documents?.title || 'Seleziona i documenti che possiedi'}
                  <Tooltip 
                    title={translations?.documents?.tooltip || 'Puoi selezionare più documenti da verificare'}
                    arrow
                    placement="right"
                  >
                    <IconButton size="small">
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Typography>
              </Box>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                {documents.map((doc) => (
                  <Grid key={doc.type} sx={{ gridColumn: { xs: '1/-1', sm: '1/5' } }}>
                    <Paper
                      elevation={3}
                      onClick={() => handleDocumentSelect(doc.type)}
                      sx={{
                        p: 3,
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        height: '100%',
                        border: selectedDocuments.includes(doc.type) ? '2px solid' : '2px solid transparent',
                        borderColor: selectedDocuments.includes(doc.type) 
                          ? doc.type === 'idCard' 
                            ? '#4CAF50' 
                            : doc.type === 'passport'
                              ? '#2196F3'
                              : '#9C27B0'
                          : 'transparent',
                        bgcolor: selectedDocuments.includes(doc.type) 
                          ? doc.type === 'idCard'
                            ? 'rgba(76, 175, 80, 0.08)'
                            : doc.type === 'passport'
                              ? 'rgba(33, 150, 243, 0.08)'
                              : 'rgba(156, 39, 176, 0.08)'
                          : 'transparent',
                        '&:hover': {
                          bgcolor: doc.type === 'idCard'
                            ? 'rgba(76, 175, 80, 0.04)'
                            : doc.type === 'passport'
                              ? 'rgba(33, 150, 243, 0.04)'
                              : 'rgba(156, 39, 176, 0.04)',
                        },
                        transition: 'all 0.2s ease-in-out'
                      }}
                    >
                      {doc.icon}
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                          {doc.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {doc.description}
                        </Typography>
                      </Box>
                      {selectedDocuments.includes(doc.type) && (
                        <CheckCircleIcon 
                          sx={{ 
                            color: doc.type === 'idCard' 
                              ? '#4CAF50' 
                              : doc.type === 'passport'
                                ? '#2196F3'
                                : '#9C27B0',
                            position: 'absolute',
                            top: 8,
                            right: 8
                          }} 
                        />
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                mt: 4
              }}>
                <Button 
                  variant="text"
                  onClick={onCancel}
                  sx={{ 
                    color: '#666',
                    '&:hover': {
                      bgcolor: 'rgba(0,0,0,0.05)'
                    }
                  }}
                >
                  {translations?.verification?.buttons?.back || 'Indietro'}
                </Button>
                <Button 
                  variant="contained"
                  onClick={() => setShowForm(true)}
                  disabled={selectedDocuments.length === 0}
                  sx={{ 
                    minWidth: 120,
                    bgcolor: '#1976d2',
                    '&:hover': {
                      bgcolor: '#1565c0'
                    }
                  }}
                >
                  {translations?.verification?.buttons?.next || 'Avanti'}
                </Button>
              </Box>
            </>
          )}

          {(showForm || isCapturingPhoto) && (
            <Box>
              {getCurrentContent()}
            </Box>
          )}

          <BiometricPopup 
            open={showBiometricPopup}
            onClose={handleBiometricPopupClose}
            onProceed={handleBiometricPopupProceed}
          />
        </>
      )}
    </Container>
  );
};
  
  