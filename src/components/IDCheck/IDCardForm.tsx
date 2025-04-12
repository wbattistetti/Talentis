import React, { useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';

interface IDCardFormProps {
  onDataChange: (data: any) => void;
  personalData?: {
    nome?: string;
    cognome?: string;
    dataNascita?: string;
    numeroDocumento?: string;
    dataScadenza?: string;
  };
}

export const IDCardForm: React.FC<IDCardFormProps> = ({ onDataChange, personalData }) => {
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
          src="/icons/IdCard.png"
          alt="Carta d'identità"
          style={{ width: '96px', height: '96px' }}
        />
        <Typography variant="h5">
          Carta d'identità
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
    </Box>
  );
}; 