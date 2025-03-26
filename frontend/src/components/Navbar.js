import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import vcLogo from "assets/images/logo_bg_removed.png";
import MKBox from "components/MKBox";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = sessionStorage.getItem("usertype");

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static" style={{backgroundColor: "#2196f3"}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <MKBox
            component="img"
            src={vcLogo}
            alt={"name"}
            maxWidth="14rem"
            borderRadius={"0.75rem"}
            onClick={() => navigate("/home")}
          />
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
            color="inherit"
            onClick={() => navigate('/home')}
            sx={{ 
              backgroundColor: 'transparent'
            }}
          >
            Home
          </Button>
          <Button
            color="inherit"
            // onClick={() => navigate('/')}
            sx={{ 
              backgroundColor: isActive('/user-selection') ? 'rgb(14 102 172)' : 'transparent'
            }}
          >
            User
          </Button>
          <Button
            color="inherit"
            // onClick={() => navigate('/diagnosis')}
            sx={{ 
              backgroundColor: isActive('/diagnosis') ? 'rgb(14 102 172)' : 'transparent'
            }}
          >
            Diagnosis
          </Button>
          {userType !== "Patient" ? <Button
            color="inherit"
            // onClick={() => navigate('/drug-simulation')}
            sx={{ 
              backgroundColor: isActive('/drug-simulation') ? 'rgb(14 102 172)' : 'transparent'
            }}
          >
            Drug Simulation
          </Button> : ""}
          {userType !== "Patient" ? <Button
            color="inherit"
            // onClick={() => navigate('/summary')}
            sx={{ 
              backgroundColor: isActive('/summary') ? 'rgb(14 102 172)' : 'transparent'
            }}
          >
            Summary
          </Button> : ""}
          <Button
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ 
              backgroundColor: 'trasparent'
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 