import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Virtual Cure
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ 
              backgroundColor: isActive('/') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
            }}
          >
            User
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/diagnosis')}
            sx={{ 
              backgroundColor: isActive('/diagnosis') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
            }}
          >
            Diagnosis
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/drug-simulation')}
            sx={{ 
              backgroundColor: isActive('/drug-simulation') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
            }}
          >
            Drug Simulation
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/summary')}
            sx={{ 
              backgroundColor: isActive('/summary') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
            }}
          >
            Summary
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 