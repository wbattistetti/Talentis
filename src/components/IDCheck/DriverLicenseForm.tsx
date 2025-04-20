import React, { useEffect } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';

interface DriverLicenseFormProps {
  onDataChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  personalData?: {
    nome?: string;
    cognome?: string;
    dataNascita?: string;
    numeroPatente?: string;
    dataScadenza?: string;
  };
}

export const DriverLicenseForm: React.FC<DriverLicenseFormProps> = ({ onDataChange, onNext, onBack, personalData }) => {
  useEffect(() => {
    if (personalData) {
      onDataChange(personalData);
    }
  }, [personalData]);

  const handleInputChange = (field: string, value: string) => {
    onDataChange({ [field]: value });
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        mb: 2 
      }}>
        <img
          src="/icons/DriverLicense.png"
          alt="Patente di guida"
          style={{ width: '96px', height: '96px' }}
        />
        <Typography variant="h5">
          Patente di guida
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
            flex: 1,
            minWidth: 0
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

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Data di nascita
            </Typography>
            <TextField
              size="small"
              type="date"
              variant="outlined"
              value={personalData?.dataNascita || ''}
              onChange={(e) => handleInputChange('dataNascita', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          gap: 1.5,
          '& .MuiTextField-root': {
            flex: 1,
            minWidth: 0
          }
        }}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Numero patente
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              value={personalData?.numeroPatente || ''}
              onChange={(e) => handleInputChange('numeroPatente', e.target.value)}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
              Data di scadenza
            </Typography>
            <TextField
              size="small"
              type="date"
              variant="outlined"
              value={personalData?.dataScadenza || ''}
              onChange={(e) => handleInputChange('dataScadenza', e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        mt: 3
      }}>
        <Button 
          variant="outlined" 
          onClick={onBack}
          sx={{ minWidth: 120 }}
        >
          Indietro
        </Button>
        <Button 
          variant="contained"
          onClick={onNext}
          sx={{ minWidth: 120 }}
        >
          Avanti
        </Button>
      </Box>
    </Box>
  );
}; 