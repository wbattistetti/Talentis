import React, { useEffect } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';

interface IDCardFormProps {
  onDataChange: (data: any) => void;
  onBack: () => void;
  onNext: () => void;
  personalData?: {
    nome?: string;
    cognome?: string;
    dataNascita?: string;
    numeroDocumento?: string;
    dataScadenza?: string;
  };
}

export const IDCardForm: React.FC<IDCardFormProps> = ({ onDataChange, onBack, onNext, personalData }) => {
  useEffect(() => {
    if (personalData) {
      onDataChange(personalData);
    }
  }, [personalData]);

  const handleInputChange = (field: string, value: string) => {
    onDataChange({ [field]: value });
  };

  return (
    <Box sx={{
      backgroundColor: '#f5f8ff',  // Sfondo azzurro pastello
      border: '1px solid #e0e7ff',  // Bordo leggermente più scuro dello sfondo
      borderRadius: '16px',         // Bordi arrotondati
      padding: '24px',              // Padding interno
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',  // Leggera ombra
      maxWidth: '740px',            // Limita la larghezza massima
      margin: '0 auto'              // Centra il box
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        mb: 2 
      }}>
        <img
          src="/icons/IdCard.png"
          alt="Carta d'identità"
          style={{ width: '96px', height: '96px' }}
        />
        <Typography variant="h5" color="error">
          Inserisci i dati della carta d'identità
        </Typography>
      </Box>

      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5
      }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 1.5,
          '& .MuiTextField-root': {
            width: '220px',
            flex: 'none'
          }
        }}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Nome
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              value={personalData?.nome || ''}
              onChange={(e) => handleInputChange('nome', e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Cognome
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              value={personalData?.cognome || ''}
              onChange={(e) => handleInputChange('cognome', e.target.value)}
            />
          </Box>

          <Box sx={{ position: 'relative' }}>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Data di nascita
            </Typography>
            <TextField
              size="small"
              placeholder="gg/mm/aaaa"
              variant="outlined"
              value={personalData?.dataNascita || ''}
              onChange={(e) => handleInputChange('dataNascita', e.target.value)}
            />
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          gap: 1.5,
          '& .MuiTextField-root': {
            width: '220px',
            flex: 'none'
          }
        }}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Numero carta d'identità
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              value={personalData?.numeroDocumento || ''}
              onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Data di scadenza
            </Typography>
            <TextField
              size="small"
              placeholder="gg/mm/aaaa"
              variant="outlined"
              value={personalData?.dataScadenza || ''}
              onChange={(e) => handleInputChange('dataScadenza', e.target.value)}
            />
          </Box>
        </Box>

        <Box sx={{ 
          position: 'relative',
          mt: 4,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%'
        }}>
          <Button 
            variant="text"
            onClick={onBack}
            sx={{ 
              color: '#1976d2',
              fontSize: '0.875rem'
            }}
          >
            INDIETRO
          </Button>
          <Box sx={{ 
            position: 'absolute',
            left: '484px'
          }}>
            <Button 
              variant="contained" 
              onClick={onNext}
              sx={{ 
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0'
                },
                fontSize: '0.875rem',
                py: 1,
                width: '220px'
              }}
            >
              AVANTI
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}; 