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
  IconButton
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import SecurityIcon from '@mui/icons-material/Security';
import InfoIcon from '@mui/icons-material/Info';

interface VerificationDialogProps {
  open: boolean;
  onClose: () => void;
  translations: any;
}

export const VerificationDialog: React.FC<VerificationDialogProps> = ({ open, onClose, translations }) => {
  if (!translations?.verification) {
    return null;
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '90vh',
          borderRadius: 2,
          m: 2
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
            {translations.verification.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ 
            color: '#666',
            fontWeight: 400,
            fontSize: '1rem',
            mb: 2
          }}>
            con Talentis
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 4, pb: 3 }}>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ 
            mb: 3,
            color: '#666',
            textAlign: 'center'
          }}
        >
          {translations.verification.description}
        </Typography>
        
        <Paper elevation={0} sx={{ bgcolor: '#f5f5f5', p: 2, mb: 3, borderRadius: 2 }}>
          <List disablePadding>
            <ListItem>
              <ListItemIcon>
                <DescriptionIcon sx={{ fontSize: 28, color: '#4CAF50' }} />
              </ListItemIcon>
              <ListItemText 
                primary={translations.verification.steps.documents}
                primaryTypographyProps={{ 
                  variant: 'body1',
                  sx: { 
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }
                }}
              />
              <Tooltip 
                title="Se hai la patente ti consigliamo di mostrarla perché è utile indicare che hai la patente nel curriculum, ovviamente se hai anche il passaporto questo ti permette di viaggiare dove vuoi (per eventuali visti potrai ricorrere al nostro supporto legale)"
                arrow
                placement="top"
              >
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CameraAltIcon sx={{ fontSize: 28, color: '#4CAF50' }} />
              </ListItemIcon>
              <ListItemText 
                primary={translations.verification.steps.photos}
                primaryTypographyProps={{ 
                  variant: 'body1',
                  sx: { color: '#333' }
                }}
              />
            </ListItem>
          </List>
        </Paper>

        <Typography variant="h6" sx={{ 
          mt: 4, 
          mb: 2, 
          fontWeight: 600,
          color: '#1976d2'
        }}>
          {translations.verification.why.title}
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <VerifiedUserIcon sx={{ fontSize: 28, color: '#2196F3' }} />
            </ListItemIcon>
            <ListItemText 
              primary={translations.verification.why.points.identity}
              primaryTypographyProps={{ 
                variant: 'body1',
                sx: { color: '#333' }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <VerifiedUserIcon sx={{ fontSize: 28, color: '#2196F3' }} />
            </ListItemIcon>
            <ListItemText 
              primary={translations.verification.why.points.certification}
              primaryTypographyProps={{ 
                variant: 'body1',
                sx: { 
                  color: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }
              }}
            />
            <Tooltip 
              title="Poter certificare che le prove pratiche sono state effettuate completamente da te è una garanzia per il tuo potenziale datore di lavoro! Certifica il tuo curriculum e aumenta le tue possibilità di trovare lavoro!"
              arrow
              placement="top"
            >
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </ListItem>
        </List>

        <Typography variant="h6" sx={{ 
          mt: 4, 
          mb: 2, 
          fontWeight: 600,
          color: '#1976d2'
        }}>
          {translations.verification.privacy.title}
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <PrivacyTipIcon sx={{ fontSize: 28, color: '#9C27B0' }} />
            </ListItemIcon>
            <ListItemText 
              primary={translations.verification.privacy.points.security}
              primaryTypographyProps={{ 
                variant: 'body1',
                sx: { 
                  color: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }
              }}
            />
            <Tooltip 
              title="I tuoi dati sono protetti secondo le normative GDPR e vengono utilizzati solo per le finalità specificate"
              arrow
              placement="top"
            >
              <IconButton size="small">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SecurityIcon sx={{ fontSize: 28, color: '#FF9800' }} />
            </ListItemIcon>
            <ListItemText 
              primary={translations.verification.privacy.points.certification}
              primaryTypographyProps={{ 
                variant: 'body1',
                sx: { color: '#333' }
              }}
            />
          </ListItem>
        </List>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography 
            variant="body2" 
            component="a"
            href="#"
            sx={{ 
              color: '#1976d2',
              textDecoration: 'none',
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            {translations.verification.privacy.more}
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex',
          justifyContent: 'center',
          mt: 4
        }}>
          <Button 
            variant="contained" 
            onClick={onClose}
            sx={{ 
              minWidth: '200px',
              py: 1.5,
              px: 4,
              fontSize: '1rem',
              textTransform: 'none',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0'
              }
            }}
          >
            {translations.verification.buttons.understand}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}; 