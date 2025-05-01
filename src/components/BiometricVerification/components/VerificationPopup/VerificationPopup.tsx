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

interface VerificationPopupProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}

const VerificationPopup: React.FC<VerificationPopupProps> = ({
  open,
  onClose,
  onProceed
}) => {
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
        <Box>
          <Typography variant="h5" component="div" sx={{ 
            fontWeight: 600,
            color: '#1976d2',
            mb: 1
          }}>
            {t('verification.title')}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 4, pb: 4 }}>
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 3,
            color: '#666',
            textAlign: 'left'
          }}
        >
          {t('verification.description')}
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
                  alt="Documenti"
                  sx={{ width: 28, height: 28 }}
                />
              </ListItemIcon>
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1" sx={{ color: '#333' }}>
                      {t('verification.steps.documents')}
                    </Typography>
                    <Tooltip 
                      title={t('verification.documents.tooltip')}
                      arrow
                      placement="top"
                    >
                      <IconButton size="small" sx={{ p: 0.5 }}>
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <Box component="img" 
                  src="/icons/Selfie.png"
                  alt="Selfie"
                  sx={{ width: 28, height: 28 }}
                />
              </ListItemIcon>
              <ListItemText 
                primary={t('verification.steps.photos')}
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
          {t('verification.why.title')}
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
                primary={t('verification.why.points.identity')}
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
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1" sx={{ color: '#333' }}>
                      {t('verification.why.points.certification')}
                    </Typography>
                    <Tooltip 
                      title={t('verification.why.points.tooltip')}
                      arrow
                      placement="top"
                    >
                      <IconButton size="small" sx={{ p: 0.5 }}>
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              />
            </ListItem>
          </List>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ 
        px: 4, 
        pb: 4, 
        pt: 2,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Button 
          variant="contained"
          onClick={onProceed}
          sx={{ 
            py: 1.5,
            width: '100%',
            maxWidth: 'calc(100% - 32px)',
            bgcolor: '#1976d2',
            '&:hover': {
              bgcolor: '#1565c0'
            }
          }}
        >
          {t('verification.buttons.understand')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerificationPopup; 