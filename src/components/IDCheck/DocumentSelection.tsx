import React, { useEffect, useRef } from 'react';
import { Box, Button, Typography, IconButton, Tooltip, Container, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
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

interface DocumentSelectionProps {
  onCancel: () => void;
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

export const DocumentSelection: React.FC<DocumentSelectionProps> = ({ onCancel }) => {
  const [selectedDocuments, setSelectedDocuments] = React.useState<string[]>([]);
  const [showForm, setShowForm] = React.useState(false);
  const [currentFormIndex, setCurrentFormIndex] = React.useState(0);
  const [isCapturingPhoto, setIsCapturingPhoto] = React.useState(false);
  const [isCapturingBack, setIsCapturingBack] = React.useState(false);
  const [documentsData, setDocumentsData] = React.useState<DocumentsData>({});
  const [showWelcomeDialog, setShowWelcomeDialog] = React.useState(true);
  const [showProceedButton, setShowProceedButton] = React.useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDocumentSelect = (documentType: string) => {
    setSelectedDocuments(prev => {
      if (prev.includes(documentType)) {
        return prev.filter(doc => doc !== documentType);
      }
      return [...prev, documentType];
    });
  };

  const handleNext = () => {
    if (!showForm) {
      setShowForm(true);
    } else if (!isCapturingPhoto) {
      // Se siamo nel form, passa alla cattura foto
      setIsCapturingPhoto(true);
    } else if (!isCapturingBack && needsBackPhoto(selectedDocuments[currentFormIndex])) {
      // Se stiamo catturando la foto frontale e il documento richiede il retro
      setIsCapturingBack(true);
    } else if (currentFormIndex < selectedDocuments.length - 1) {
      // Passa al prossimo documento
      setCurrentFormIndex(prev => prev + 1);
      setIsCapturingPhoto(false);
      setIsCapturingBack(false);
    }
  };

  const handleBack = () => {
    if (isCapturingBack) {
      setIsCapturingBack(false);
    } else if (isCapturingPhoto) {
      setIsCapturingPhoto(false);
    } else if (currentFormIndex > 0) {
      setCurrentFormIndex(prev => prev - 1);
      setIsCapturingPhoto(false);
      setIsCapturingBack(false);
    } else {
      setShowForm(false);
    }
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
    setDocumentsData(prev => ({
      ...prev,
      [currentDoc]: {
        ...prev[currentDoc],
        [isCapturingBack ? 'backPhoto' : 'frontPhoto']: photoData
      }
    }));
    handleNext();
  };

  const needsBackPhoto = (documentType: string) => {
    return documentType === 'id' || documentType === 'driverLicense';
  };

  const getNextButtonText = () => {
    if (!showForm) return 'Avanti';
    if (!isCapturingPhoto) return 'Scatta o carica foto';
    if (!isCapturingBack && needsBackPhoto(selectedDocuments[currentFormIndex])) return 'Scatta retro';
    if (currentFormIndex === selectedDocuments.length - 1) return 'Conferma';
    return 'Avanti';
  };

  const getDocumentTitle = (documentType: string) => {
    switch (documentType) {
      case 'id':
        return 'Carta d\'identità';
      case 'passport':
        return 'Passaporto';
      case 'driverLicense':
        return 'Patente di guida';
      default:
        return '';
    }
  };

  const getCurrentContent = () => {
    const currentDoc = selectedDocuments[currentFormIndex];
    const currentData = documentsData[currentDoc];

    if (isCapturingPhoto) {
      return (
        <Box>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            mb: 3 
          }}>
            <img
              src={`/icons/${currentDoc === 'id' ? 'IdCard' : 
                    currentDoc === 'passport' ? 'Passport' : 
                    'DriverLicense'}.png`}
              alt={getDocumentTitle(currentDoc)}
              style={{ width: '50px', height: '50px' }}
            />
            <Typography variant="h6">
              {isCapturingBack ? `Retro ${getDocumentTitle(currentDoc)}` : `Fronte ${getDocumentTitle(currentDoc)}`}
            </Typography>
          </Box>
          <PhotoCapture 
            onPhotoCapture={handlePhotoCapture}
            onNext={handleNext}
            onBack={handleBack}
            documentType={getDocumentTitle(currentDoc)}
          />
        </Box>
      );
    }

    switch (currentDoc) {
      case 'id':
        return <IDCardForm onDataChange={handleDataChange} personalData={currentData?.personalData} />;
      case 'passport':
        return <PassportForm onDataChange={handleDataChange} personalData={currentData?.personalData} />;
      case 'driverLicense':
        return <DriverLicenseForm onDataChange={handleDataChange} personalData={currentData?.personalData} />;
      default:
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Dialog 
        open={showWelcomeDialog} 
        onClose={() => {}}
        maxWidth="md"
        fullWidth
        disableEscapeKeyDown
        PaperProps={{
          sx: {
            maxHeight: '80vh',
            borderRadius: 2,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Verifica della tua identità con Talentis
          </Typography>
        </DialogTitle>
        <DialogContent 
          ref={contentRef}
          sx={{ 
            overflowY: 'auto',
            px: 2,
            pb: 4,
            flex: 1,
            '& .MuiListItem-root': {
              py: 0.5,
              '& .MuiListItemIcon-root': {
                minWidth: 36
              }
            }
          }}
        >
          <Typography variant="body2" paragraph sx={{ mb: 1 }}>
            Per completare la registrazione, dobbiamo verificare la tua identità. Ti chiederemo:
          </Typography>
          
          <List dense>
            <ListItem>
              <ListItemIcon>
                <DescriptionIcon sx={{ fontSize: 24, color: '#4CAF50' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Di indicare i documenti che vuoi utilizzare (es. carta d'identità o passaporto)."
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CameraAltIcon sx={{ fontSize: 24, color: '#4CAF50' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Di scattare una foto del documento e un selfie (foto e video)."
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          </List>

          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
            Perché serve questa verifica?
          </Typography>
          
          <List dense>
            <ListItem>
              <ListItemIcon>
                <VerifiedUserIcon sx={{ fontSize: 24, color: '#2196F3' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Certifica che sei la persona indicata nel documento."
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <VerifiedUserIcon sx={{ fontSize: 24, color: '#2196F3' }} />
              </ListItemIcon>
              <ListItemText 
                primary="È una garanzia per i datori di lavoro e rende il tuo curriculum certificato, aumentando le tue opportunità."
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          </List>

          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
            E la tua privacy?
          </Typography>
          
          <List dense>
            <ListItem>
              <ListItemIcon>
                <PrivacyTipIcon sx={{ fontSize: 24, color: '#9C27B0' }} />
              </ListItemIcon>
              <ListItemText 
                primary="I tuoi dati sono al sicuro e non saranno mai divulgati."
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SecurityIcon sx={{ fontSize: 24, color: '#FF9800' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Il nostro sito è certificato con i più alti standard di sicurezza informatica."
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          </List>

          <Typography variant="caption" sx={{ mt: 1, textAlign: 'center', display: 'block' }}>
            Vuoi maggiori dettagli? Consulta qui le nostre certificazioni di sicurezza.
          </Typography>
        </DialogContent>
        <Box sx={{ 
          position: 'sticky',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          opacity: showProceedButton ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          pointerEvents: showProceedButton ? 'auto' : 'none',
          zIndex: 1,
          mt: 'auto'
        }}>
          <Button 
            variant="contained" 
            onClick={() => setShowWelcomeDialog(false)}
            sx={{ 
              minWidth: '200px',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0'
              }
            }}
          >
            Ho capito, procediamo
          </Button>
        </Box>
      </Dialog>

      <Box sx={{ width: '100%' }}>
        {!showForm ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Seleziona i documenti che possiedi
              </Typography>
              <Tooltip title="Puoi selezionare più documenti da verificare">
                <IconButton>
                  <InfoIcon color="action" />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 3,
              '& > *': {
                flex: '1 1 300px',
                maxWidth: '100%',
              }
            }}>
              <Button
                variant={selectedDocuments.includes('id') ? 'contained' : 'outlined'}
                fullWidth
                onClick={() => handleDocumentSelect('id')}
                sx={{ height: '120px' }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    src={selectedDocuments.includes('id') ? '/icons/IdCard.png' : '/icons/IdCardGrey.png'}
                    alt="ID"
                    style={{
                      width: '50px',
                      height: '50px',
                      filter: selectedDocuments.includes('id') ? 'none' : 'grayscale(100%)',
                    }}
                  />
                  <Typography>Carta d'identità</Typography>
                </Box>
              </Button>
              <Button
                variant={selectedDocuments.includes('passport') ? 'contained' : 'outlined'}
                fullWidth
                onClick={() => handleDocumentSelect('passport')}
                sx={{ height: '120px' }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    src={selectedDocuments.includes('passport') ? '/icons/Passport.png' : '/icons/PassportGrey.png'}
                    alt="Passport"
                    style={{
                      width: '50px',
                      height: '50px',
                      filter: selectedDocuments.includes('passport') ? 'none' : 'grayscale(100%)',
                    }}
                  />
                  <Typography>Passaporto</Typography>
                </Box>
              </Button>
              <Button
                variant={selectedDocuments.includes('driverLicense') ? 'contained' : 'outlined'}
                fullWidth
                onClick={() => handleDocumentSelect('driverLicense')}
                sx={{ height: '120px' }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    src={selectedDocuments.includes('driverLicense') ? '/icons/DriverLicense.png' : '/icons/DriverLicenseGrey.png'}
                    alt="Driver License"
                    style={{
                      width: '50px',
                      height: '50px',
                      filter: selectedDocuments.includes('driverLicense') ? 'none' : 'grayscale(100%)',
                    }}
                  />
                  <Typography>Patente di guida</Typography>
                </Box>
              </Button>
            </Box>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={onCancel}>Annulla</Button>
              <Button 
                variant="contained" 
                onClick={handleNext} 
                disabled={selectedDocuments.length === 0}
              >
                Avanti
              </Button>
            </Box>
          </>
        ) : (
          <>
            {getCurrentContent()}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handleBack}>
                {currentFormIndex === 0 && !isCapturingPhoto ? 'Indietro' : 'Precedente'}
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {getNextButtonText()}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};
  
  