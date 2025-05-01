import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface TopNavigationProps {
  onNavigate: (page: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ onNavigate }) => {
  const { t } = useTranslation();

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ mr: 2 }}>
          {t('common.navigation.pages')}:
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined"
            onClick={() => onNavigate('basicProfile')}
          >
            {t('navigation.basicProfile')}
          </Button>
          {/* Altri pulsanti di navigazione verranno aggiunti qui */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavigation; 