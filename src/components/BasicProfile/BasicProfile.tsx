import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Grid,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CloudUpload as UploadIcon, Add as AddIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export const BasicProfile: React.FC = () => {
  const { t } = useTranslation();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isParsingCV, setIsParsingCV] = useState(false);
  const [cvParseError, setCvParseError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsParsingCV(true);
    setCvParseError(null);

    try {
      // TODO: Implement CV parsing logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      setIsParsingCV(false);
    } catch (error) {
      setCvParseError(t('basicProfile.cv.parseError'));
      setIsParsingCV(false);
    }
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { company: '', role: '', period: '', description: '' }
    ]);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          {t('basicProfile.title')}
        </Typography>
        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          {t('basicProfile.subtitle')}
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Age Field */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label={t('basicProfile.age.label')}
              placeholder={t('basicProfile.age.placeholder')}
              type="number"
            />
          </Grid>

          {/* Education Field */}
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth>
              <InputLabel>{t('basicProfile.education.label')}</InputLabel>
              <Select label={t('basicProfile.education.label')}>
                <MenuItem value="highSchool">{t('basicProfile.education.options.highSchool')}</MenuItem>
                <MenuItem value="bachelor">{t('basicProfile.education.options.bachelor')}</MenuItem>
                <MenuItem value="master">{t('basicProfile.education.options.master')}</MenuItem>
                <MenuItem value="phd">{t('basicProfile.education.options.phd')}</MenuItem>
                <MenuItem value="other">{t('basicProfile.education.options.other')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Location Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('basicProfile.location.label')}
              placeholder={t('basicProfile.location.placeholder')}
            />
          </Grid>

          {/* Current Occupation Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={t('basicProfile.currentOccupation.label')}
              placeholder={t('basicProfile.currentOccupation.placeholder')}
            />
          </Grid>

          {/* Experience Level */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>{t('basicProfile.experience.label')}</InputLabel>
              <Select label={t('basicProfile.experience.label')}>
                <MenuItem value="junior">{t('basicProfile.experience.options.junior')}</MenuItem>
                <MenuItem value="mid">{t('basicProfile.experience.options.mid')}</MenuItem>
                <MenuItem value="senior">{t('basicProfile.experience.options.senior')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* CV Upload */}
          <Grid item xs={12}>
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: 'background.default',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover',
                }
              }}
            >
              <label htmlFor="cv-upload">
                <Input
                  accept="application/pdf"
                  id="cv-upload"
                  type="file"
                  onChange={handleFileUpload}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <UploadIcon color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6" color="primary">
                    {t('basicProfile.cv.dragDrop')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('basicProfile.cv.format')}
                  </Typography>
                  {isParsingCV && (
                    <Box sx={{ mt: 2 }}>
                      <CircularProgress size={24} />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {t('basicProfile.cv.parsing')}
                      </Typography>
                    </Box>
                  )}
                  {cvParseError && (
                    <Typography color="error" variant="body2">
                      {cvParseError}
                    </Typography>
                  )}
                </Box>
              </label>
            </Paper>
          </Grid>

          {/* Experiences Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h6">Esperienze</Typography>
              <Tooltip title={t('basicProfile.buttons.addExperience')}>
                <IconButton onClick={addExperience} color="primary">
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Box>
            
            {experiences.map((exp, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2 }} variant="outlined">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Azienda"
                      value={exp.company}
                      onChange={(e) => {
                        const newExperiences = [...experiences];
                        newExperiences[index].company = e.target.value;
                        setExperiences(newExperiences);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Ruolo"
                      value={exp.role}
                      onChange={(e) => {
                        const newExperiences = [...experiences];
                        newExperiences[index].role = e.target.value;
                        setExperiences(newExperiences);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Periodo"
                      value={exp.period}
                      onChange={(e) => {
                        const newExperiences = [...experiences];
                        newExperiences[index].period = e.target.value;
                        setExperiences(newExperiences);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Descrizione"
                      value={exp.description}
                      onChange={(e) => {
                        const newExperiences = [...experiences];
                        newExperiences[index].description = e.target.value;
                        setExperiences(newExperiences);
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Grid>

          {/* Save Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
            >
              {t('basicProfile.buttons.save')}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BasicProfile; 