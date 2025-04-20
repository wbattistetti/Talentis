import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography,
  Box
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';

interface BiometricIntroDialogProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export const BiometricIntroDialog: React.FC<BiometricIntroDialogProps> = ({
  open,
  onClose,
  onProceed
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ textAlign: 'center', pt: 3 }}>
        <SecurityIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5">
          Verifica Biometrica
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Typography paragraph>
            Per garantire la sicurezza e l'integrità del processo, ora procederemo con una breve verifica biometrica che include:
          </Typography>
          
          <Box sx={{ pl: 2 }}>
            <Typography component="div" sx={{ mb: 1 }}>
              • Un selfie per la verifica dell'identità
            </Typography>
            <Typography component="div" sx={{ mb: 1 }}>
              • Un breve video di conferma della presenza fisica
            </Typography>
          </Box>

          <Typography paragraph sx={{ mt: 2 }}>
            Questi dati verranno utilizzati esclusivamente per verificare la corrispondenza con i documenti forniti e garantire la sicurezza durante le prove pratiche.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Indietro
        </Button>
        <Button onClick={onProceed} variant="contained" autoFocus>
          Procedi
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 