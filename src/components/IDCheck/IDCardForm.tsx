import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Tooltip } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTranslation } from 'react-i18next';

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

interface ValidationErrors {
  [key: string]: string | undefined;
}

export const IDCardForm: React.FC<IDCardFormProps> = ({ onDataChange, onBack, onNext, personalData }) => {
  const { t } = useTranslation();
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
        return t('idCardForm.errors.dataNascita');
      }
    } else if (field === 'dataScadenza') {
      if (inputDate < today) {
        return t('idCardForm.errors.dataScadenza');
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
      data?.numeroDocumento?.trim() &&
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
        <Typography variant="h5" color="primary">
          {t('idCardForm.title')}
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
              {t('idCardForm.fields.nome')}
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
              {t('idCardForm.fields.cognome')}
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              value={personalData?.cognome || ''}
              onChange={(e) => handleInputChange('cognome', e.target.value)}
            />
          </Box>

          {renderDateField('dataNascita', t('idCardForm.fields.dataNascita'), personalData?.dataNascita)}
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
              {t('idCardForm.fields.numeroDocumento')}
            </Typography>
            <TextField
              size="small"
              variant="outlined"
              value={personalData?.numeroDocumento || ''}
              onChange={(e) => handleInputChange('numeroDocumento', e.target.value)}
            />
          </Box>

          {renderDateField('dataScadenza', t('idCardForm.fields.dataScadenza'), personalData?.dataScadenza)}
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
            variant="text"
            onClick={onBack}
            sx={{ 
              color: '#1976d2',
              fontSize: '0.875rem'
            }}
          >
            {t('idCardForm.buttons.back')}
          </Button>
          <Button 
            variant="contained" 
            onClick={onNext}
            disabled={!isFormValid}
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
            {t('idCardForm.buttons.next')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}; 