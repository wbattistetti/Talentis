import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Tooltip } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface PassportFormProps {
  onDataChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  personalData?: {
    nome?: string;
    cognome?: string;
    dataNascita?: string;
    numeroPassaporto?: string;
    dataScadenza?: string;
  };
}

interface ValidationErrors {
  dataNascita?: string;
  dataScadenza?: string;
}

export const PassportForm: React.FC<PassportFormProps> = ({ onDataChange, onNext, onBack, personalData }) => {
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (personalData) {
      onDataChange(personalData);
      validateForm(personalData);
    }
  }, [personalData]);

  const validateDate = (date: string, field: 'dataNascita' | 'dataScadenza'): string | undefined => {
    if (!date) return undefined;
    
    const inputDate = new Date(date);
    const today = new Date();
    
    if (field === 'dataNascita') {
      if (inputDate > today) {
        return 'La data di nascita deve essere nel passato';
      }
    } else if (field === 'dataScadenza') {
      if (inputDate < today) {
        return 'La data di scadenza deve essere nel futuro';
      }
    }
    return undefined;
  };

  const validateForm = (data: any) => {
    const newErrors: ValidationErrors = {};
    
    // Validazione date
    const birthDateError = validateDate(data?.dataNascita, 'dataNascita');
    const expiryDateError = validateDate(data?.dataScadenza, 'dataScadenza');
    
    if (birthDateError) newErrors.dataNascita = birthDateError;
    if (expiryDateError) newErrors.dataScadenza = expiryDateError;
    
    setErrors(newErrors);

    // Verifica se tutti i campi sono compilati e non sono stringhe vuote
    const isValid = !!(
      data?.nome?.trim() &&
      data?.cognome?.trim() &&
      data?.dataNascita?.trim() &&
      data?.numeroPassaporto?.trim() &&
      data?.dataScadenza?.trim() &&
      Object.keys(newErrors).length === 0
    );

    setIsFormValid(isValid);
  };

  const handleInputChange = (field: string, value: string) => {
    const newData = {
      ...personalData,
      [field]: value
    };
    onDataChange(newData);
    validateForm(newData);
  };

  const renderDateField = (
    field: 'dataNascita' | 'dataScadenza',
    label: string,
    value: string | undefined
  ) => (
    <Box sx={{ position: 'relative' }}>
      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TextField
          size="small"
          type="date"
          variant="outlined"
          value={value || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          error={!!errors[field]}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {errors[field] && (
          <Tooltip title={errors[field]} placement="top" arrow>
            <ErrorOutlineIcon color="error" />
          </Tooltip>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{
      backgroundColor: '#f5f8ff',
      border: '1px solid #e0e7ff',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      maxWidth: '740px',
      margin: '0 auto'
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        mb: 2 
      }}>
        <img
          src="/icons/Passport.png"
          alt="Passaporto"
          style={{ width: '96px', height: '96px' }}
        />
        <Typography variant="h5" color="primary">
          Inserisci i dati del passaporto
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

          {renderDateField('dataNascita', 'Data di nascita', personalData?.dataNascita)}
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
              Numero passaporto
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              value={personalData?.numeroPassaporto || ''}
              onChange={(e) => handleInputChange('numeroPassaporto', e.target.value)}
            />
          </Box>

          {renderDateField('dataScadenza', 'Data di scadenza', personalData?.dataScadenza)}
        </Box>

        <Box sx={{ 
          position: 'relative',
          mt: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
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
            disabled={!isFormValid}
            sx={{ minWidth: 120 }}
          >
            Avanti
          </Button>
        </Box>
      </Box>
    </Box>
  );
}; 