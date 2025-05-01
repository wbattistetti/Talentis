import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Paper
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AwardIcon from '@mui/icons-material/EmojiEvents';
import i18n from '../../i18n';

interface VerificationDialogProps {
  open: boolean;
  onClose: () => void;
}

export const VerificationDialog: React.FC<VerificationDialogProps> = ({
  open,
  onClose
}) => {
  const { t } = useTranslation();

  // TEST: loggo la traduzione e le risorse caricate
  console.log('TEST t(documents.steps.documents):', t('documents.steps.documents'));
  console.log('TEST i18n.t(documents.steps.documents):', i18n.t('documents.steps.documents'));
  console.log('LANG:', i18n.language);
  console.log('RESOURCES:', i18n.options.resources);

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '90vh',
          borderRadius: 2,
          m: 2,
          minWidth: { sm: '800px' }
        }
      }}
    >
      <DialogTitle sx={{ 
        textAlign: 'center', 
        pb: 0,
        pt: 3,
        px: 4
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <VerifiedUserIcon sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
          <Typography variant="h4" component="div" sx={{ 
            fontWeight: 700,
            color: '#1976d2',
            mb: 1
          }}>
            {t('documents.selectTitle')}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 4, pb: 4 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3,
            color: '#333',
            textAlign: 'center',
            fontWeight: 600
          }}
        >
          {t('documents.selectDescription')}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3, mb: 4, justifyContent: 'center' }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#f5f8ff', display: 'flex', alignItems: 'center', gap: 2, minWidth: 340 }}>
            <DescriptionIcon sx={{ fontSize: 36, color: '#1976d2' }} />
            <Typography variant="body1" sx={{ color: '#333' }}>
              {t('documents.steps.documents')}
            </Typography>
          </Paper>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#f5f8ff', display: 'flex', alignItems: 'center', gap: 2, minWidth: 340 }}>
            <PhotoCameraIcon sx={{ fontSize: 36, color: '#43a047' }} />
            <Typography variant="body1" sx={{ color: '#333' }}>
              {t('documents.steps.photos')}
            </Typography>
          </Paper>
        </Box>

        <Typography variant="h6" sx={{ 
          mb: 2, 
          fontWeight: 700,
          color: '#1976d2',
          textAlign: 'center'
        }}>
          {t('documents.whyVerify.title')}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 3, mb: 4, justifyContent: 'center' }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#f5f8ff', display: 'flex', alignItems: 'center', gap: 2, minWidth: 340 }}>
            <VerifiedUserIcon sx={{ fontSize: 32, color: '#1976d2' }} />
            <Typography variant="body1" sx={{ color: '#333' }}>
              {t('documents.whyVerify.certify')}
            </Typography>
          </Paper>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: '#f5f8ff', display: 'flex', alignItems: 'center', gap: 2, minWidth: 340 }}>
            <AwardIcon sx={{ fontSize: 32, color: '#ffb300' }} />
            <Typography variant="body1" sx={{ color: '#333' }}>
              {t('documents.whyVerify.certifiedCV')}
            </Typography>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 3 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          {t('documents.buttons.understand')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 