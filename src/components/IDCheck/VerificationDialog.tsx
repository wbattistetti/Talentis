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
            Verifica della identità
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
          Per completare la registrazione, ti chiederemo di:
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
                      Scattare delle fotografie ai tuoi documenti
                    </Typography>
                    <Tooltip 
                      title="Se hai la patente ti consigliamo di mostrarla perché è utile indicare che hai la patente nel curriculum, ovviamente se hai anche il passaporto questo ti permette di viaggiare dove vuoi (per eventuali visti potrai ricorrere al nostro supporto legale)"
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
                primary="Fare un selfie e un breve video"
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
          Perché serve questa verifica?
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
                primary="Certifica che sei la persona indicata nei documenti."
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
                      Rende il tuo curriculum certificato, aumentando le tue opportunità.
                    </Typography>
                    <Tooltip 
                      title="Poter certificare che le prove pratiche sono state effettuate completamente da te è una garanzia per il tuo potenziale datore di lavoro! Certifica il tuo curriculum e aumenta le tue possibilità di trovare lavoro!"
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

        <Typography variant="h6" sx={{ 
          mb: 2, 
          fontWeight: 600,
          color: '#1976d2'
        }}>
          E la tua privacy?
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
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1" sx={{ color: '#333' }}>
                      I tuoi dati sono al sicuro e saranno forniti solo ai datori di lavoro.
                    </Typography>
                    <Tooltip 
                      title="I tuoi dati sono protetti secondo le normative GDPR e vengono utilizzati solo per le finalità specificate"
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
                <SecurityIcon sx={{ fontSize: 28, color: '#FF9800' }} />
              </ListItemIcon>
              <ListItemText 
                primary="Il nostro sito è certificato con i più alti standard di sicurezza informatica."
                primaryTypographyProps={{ 
                  variant: 'body1',
                  sx: { color: '#333' }
                }}
              />
            </ListItem>
          </List>
        </Paper>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
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
            Vuoi maggiori dettagli? Consulta qui le nostre certificazioni di sicurezza
          </Typography>
        </Box>
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
          onClick={onClose}
          sx={{ 
            py: 1.5,
            width: '100%',
            maxWidth: 'calc(100% - 32px)', // Stessa larghezza del contenuto sopra
            bgcolor: '#1976d2',
            '&:hover': {
              bgcolor: '#1565c0'
            }
          }}
        >
          HO CAPITO, PROCEDIAMO
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 