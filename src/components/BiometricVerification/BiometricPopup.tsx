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
  Stack
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VideocamIcon from '@mui/icons-material/Videocam';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShieldIcon from '@mui/icons-material/Shield';
import { useTranslation } from 'react-i18next';

interface BiometricPopupProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}

const BiometricPopup: React.FC<BiometricPopupProps> = ({
  open,
  onClose,
  onProceed
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
        <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
          <AccountCircleIcon 
            sx={{ 
              fontSize: 56, 
              color: 'primary.main',
              opacity: 0.9
            }} 
          />
          <ShieldIcon 
            sx={{ 
              fontSize: 32, 
              color: 'primary.main',
              position: 'absolute',
              bottom: -4,
              right: -4
            }} 
          />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {t('biometric.popup.title')}
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
            {t('biometric.popup.description')}
          </Typography>
          
          <List sx={{ py: 0 }}>
            <ListItem sx={{ py: 1 }}>
              <ListItemIcon>
                <CameraAltIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              </ListItemIcon>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                {t('biometric.popup.selfie')}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1 }}>
              <ListItemIcon>
                <VideocamIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              </ListItemIcon>
              <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                {t('biometric.popup.video')}
              </Typography>
            </ListItem>
          </List>

          <Typography paragraph sx={{ mt: 3, fontSize: '1.1rem' }}>
            {t('biometric.popup.explanation')}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ 
            borderRadius: '8px',
            px: 3,
            py: 1
          }}
        >
          {t('common.back')}
        </Button>
        <Button 
          onClick={onProceed} 
          variant="contained" 
          autoFocus
          sx={{ 
            borderRadius: '8px',
            px: 3,
            py: 1
          }}
        >
          {t('common.proceed')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BiometricPopup; 