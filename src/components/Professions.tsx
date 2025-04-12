import React, { useState } from 'react';
import { Box, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const sectors = {
  Edilizia: ['Costruzioni', 'Ristrutturazioni', 'Ingegneria'],
  Meccanica: ['Riparazioni', 'Manutenzione', 'Meccatronica'],
  Sanità: ['Medicina', 'Infermieristica', 'Fisioterapia'],
  IT: ['Sviluppo software', 'Analisi dei dati', 'Cybersecurity'],
  Educazione: ['Insegnamento', 'Consulenza', 'Ricerca'],
  Commercio: ['Vendite', 'Gestione clienti', 'Retail'],
  Trasporti: ['Logistica', 'Autisti', 'Operai portuali'],
  Marketing: ['Copywriting', 'SEO', 'Social Media Manager'],
};

const jobs = {
  Costruzioni: ['Muratore', 'Imbianchino', 'Carpentiere'],
  Medicina: ['Chirurgo', 'Cardiologo', 'Dermatologo'],
  'Sviluppo software': ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'],
  Logistica: ['Magazziniere', 'Pianificatore logistico', 'Operaio di trasporto'],
};

const HierarchicalSelection: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string | null>(null);

  const handleSectorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedSector(event.target.value as string);
    setSelectedJobType(null); // Reset tipo lavoro quando cambia settore
    setSelectedSpecialization(null); // Reset specializzazione
  };

  const handleJobTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedJobType(event.target.value as string);
    setSelectedSpecialization(null); // Reset specializzazione
  };

  const handleSpecializationChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedSpecialization(event.target.value as string);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Trova la tua professione</Typography>

      {/* Selezione Settore */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Settore</InputLabel>
        <Select
          value={selectedSector || ''}
          onChange={handleSectorChange}
        >
          {Object.keys(sectors).map((sector) => (
            <MenuItem key={sector} value={sector}>
              {sector}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Selezione Tipo di Lavoro */}
      {selectedSector && (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Tipo di Lavoro</InputLabel>
          <Select
            value={selectedJobType || ''}
            onChange={handleJobTypeChange}
          >
            {sectors[selectedSector].map((jobType) => (
              <MenuItem key={jobType} value={jobType}>
                {jobType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Selezione Specializzazione */}
      {selectedJobType && (
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Specializzazione</InputLabel>
          <Select
            value={selectedSpecialization || ''}
            onChange={handleSpecializationChange}
          >
            {jobs[selectedJobType]?.map((specialization) => (
              <MenuItem key={specialization} value={specialization}>
                {specialization}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Mostra la selezione finale */}
      {selectedSpecialization && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Hai selezionato:</Typography>
          <Typography>Settore: {selectedSector}</Typography>
          <Typography>Tipo di Lavoro: {selectedJobType}</Typography>
          <Typography>Specializzazione: {selectedSpecialization}</Typography>
        </Box>
      )}

      {/* Pulsante Avanti */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedSpecialization}
        >
          Avanti
        </Button>
      </Box>
    </Box>
  );
};

export default HierarchicalSelection;
