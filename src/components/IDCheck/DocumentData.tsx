import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface DocumentDataProps {
  onNext: () => void;
  onBack: () => void;
  onSubmit: (data: any) => void;
  documentType: string;
}

const DocumentData: React.FC<DocumentDataProps> = ({
  onNext,
  onBack,
  onSubmit,
  documentType,
}) => {
  const [formData, setFormData] = useState({
    numeroDocumento: '',
    dataScadenza: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onNext();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Inserisci i dati del {documentType === 'ID' ? 'documento' : 'passaporto'}
      </Typography>
      <TextField
        fullWidth
        label="Numero documento"
        name="numeroDocumento"
        value={formData.numeroDocumento}
        onChange={handleChange}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Data di scadenza"
        name="dataScadenza"
        type="date"
        value={formData.dataScadenza}
        onChange={handleChange}
        margin="normal"
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack}>Indietro</Button>
        <Button type="submit" variant="contained">
          Avanti
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentData; 