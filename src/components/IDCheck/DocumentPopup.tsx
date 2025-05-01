import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Button,
  Box,
  Tooltip,
  Paper,
  IconButton,
  DialogActions
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import SecurityIcon from '@mui/icons-material/Security';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'react-i18next';

interface DocumentPopupProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export const DocumentPopup: React.FC<DocumentPopupProps> = ({ open, onClose, onProceed }) => {
  const { t } = useTranslation();

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
          minWidth: '800px'
        }
      }}
    >
      <DialogTitle sx={{ 
        textAlign: 'center', 
        pb: 0,
        pt: 3,
        px: 4
      }}>
        <Box>
          <Typography variant="h5" component="div" sx={{ 
            fontWeight: 600,
            color: '#1976d2',
            mb: 1
          }}>
            {t('documentPopup.title')}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 4 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 3,
            color: '#666',
            textAlign: 'left'
          }}
        >
          {t('documentPopup.description')}
        </Typography>
        
        <Paper elevation={0} sx={{ 
          bgcolor: '#f8f9fa',
          p: 3, 
          mb: 4, 
          borderRadius: 3,
          border: '1px solid #e9ecef'
        }}>
          <List disablePadding>
            <ListItem>
              <ListItemIcon>
                <Box component="img" 
                  src="/icons/IdCard.png"
                  alt={t('documentPopup.steps.prepare')}
                  sx={{ width: 28, height: 28 }}
                />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1" sx={{ color: '#333' }}>
                      {t('documentPopup.steps.prepare')}
                    </Typography>
                  </Box>
                }
                secondary={t('documentPopup.instructions.prepare')}
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <Box component="img" 
                  src="/icons/Selfie.png"
                  alt={t('documentPopup.steps.position')}
                  sx={{ width: 28, height: 28 }}
                />
              </ListItemIcon>
              <ListItemText 
                primary={t('documentPopup.steps.position')}
                secondary={t('documentPopup.instructions.position')}
                primaryTypographyProps={{ 
                  variant: 'body1',
                  sx: { color: '#333' }
                }}
              />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Box component="img" 
                  src="/icons/Camera.png"
                  alt={t('documentPopup.steps.capture')}
                  sx={{ width: 28, height: 28 }}
                />
              </ListItemIcon>
              <ListItemText 
                primary={t('documentPopup.steps.capture')}
                secondary={t('documentPopup.instructions.capture')}
                primaryTypographyProps={{ 
                  variant: 'body1',
                  sx: { color: '#333' }
                }}
              />
            </ListItem>
          </List>
        </Paper>

        <Typography variant="h6" sx={{ 
          mb: 2, 
          fontWeight: 600,
          color: '#1976d2'
        }}>
          {t('documents.whyVerify.title')}
        </Typography>
        
        <Paper elevation={0} sx={{ 
          bgcolor: '#f8f9fa',
          p: 3, 
          mb: 4, 
          borderRadius: 3,
          border: '1px solid #e9ecef'
        }}>
          <List disablePadding>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ fontSize: 28, color: '#1976d2' }} />
              </ListItemIcon>
              <ListItemText 
                primary={t('documents.whyVerify.certify')}
                primaryTypographyProps={{ 
                  variant: 'body1',
                  sx: { color: '#333' }
                }}
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ fontSize: 28, color: '#1976d2' }} />
              </ListItemIcon>
              <ListItemText 
                primary={t('documents.whyVerify.certifiedCV')}
                primaryTypographyProps={{ 
                  variant: 'body1',
                  sx: { color: '#333' }
                }}
              />
            </ListItem>
          </List>
        </Paper>

        <Typography variant="h6" sx={{ 
          mb: 2, 
          fontWeight: 600,
          color: '#1976d2'
        }}>
          {t('documents.privacy.title')}
        </Typography>
        
        <Paper elevation={0} sx={{ 
          bgcolor: '#f8f9fa',
          p: 3, 
          mb: 4, 
          borderRadius: 3,
          border: '1px solid #e9ecef'
        }}>
          <List disablePadding>
            <ListItem>
              <ListItemIcon>
                <PrivacyTipIcon sx={{ fontSize: 28, color: '#9C27B0' }} />
              </ListItemIcon>
              <ListItemText 
                primary={t('documents.privacy.dataSecurity')}
                primaryTypographyProps={{ 
                  variant: 'body1',
                  sx: { color: '#333' }
                }}
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <SecurityIcon sx={{ fontSize: 28, color: '#FF9800' }} />
              </ListItemIcon>
              <ListItemText 
                primary={t('documents.privacy.securityStandards')}
                primaryTypographyProps={{ 
                  variant: 'body1',
                  sx: { color: '#333' }
                }}
              />
            </ListItem>
          </List>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ px: 4, pb: 3 }}>
        <Button onClick={onClose} color="primary">
          {t('common.cancel')}
        </Button>
        <Button onClick={onProceed} variant="contained" color="primary">
          {t('common.proceed')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 