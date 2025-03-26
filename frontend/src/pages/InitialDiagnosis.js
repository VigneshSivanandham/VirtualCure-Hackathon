import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  LinearProgress,
} from '@mui/material';
import { CheckCircle, ArrowBack, ArrowForward } from '@mui/icons-material';
import axios from 'axios';

const InitialDiagnosis = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userType = sessionStorage.getItem("usertype");

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (!storedData) {
      navigate('/');
      return;
    }
    setUserData(JSON.parse(storedData));
    getDiagnosis(JSON.parse(storedData));
  }, [navigate]);

  const getErrorMessage = (error) => {
    if (typeof error === 'string') return error;
    if (error.response?.data?.detail) {
      const detail = error.response.data.detail;
      if (Array.isArray(detail)) {
        // Handle validation errors array
        return detail.map(err => err.msg).join(', ');
      }
      if (typeof detail === 'object') {
        if (detail.msg) return detail.msg;
        return JSON.stringify(detail);
      }
      return detail;
    }
    if (error.message) return error.message;
    if (typeof error === 'object') return JSON.stringify(error);
    return 'An unexpected error occurred. Please try again.';
  };

  const getDiagnosis = async (patientData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Sending diagnosis request with data:', patientData);
      
      const response = await axios.post('http://localhost:8000/diagnose', {
        name: patientData.name,
        age: parseInt(patientData.age),
        symptoms: patientData.symptoms,
        id: null,
        medical_history: null
      });

      console.log('Received diagnosis response:', response.data);
      
      setDiagnosis(response.data);
      localStorage.setItem('diagnosisData', JSON.stringify(response.data));
    } catch (err) {
      console.error('Diagnosis error:', err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Analyzing Symptoms...
          </Typography>
          <CircularProgress sx={{ my: 3 }} />
          <LinearProgress sx={{ mt: 2 }} />
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            Our AI is processing your symptoms...
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
            <Button 
              variant="outlined" 
              startIcon={<ArrowBack />}
              onClick={() => navigate('/')}
            >
              Back to Patient Info
            </Button>
            <Button 
              variant="contained"
              onClick={() => getDiagnosis(userData)}
            >
              Retry Diagnosis
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Initial Diagnosis
        </Typography>
        
        {diagnosis && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom color="primary">
              Diagnosis Assessment
            </Typography>
            <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
              {diagnosis.diagnosis}
            </Typography>

            <Box sx={{ my: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Confidence Level: {(diagnosis.confidence * 100).toFixed(1)}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={diagnosis.confidence * 100}
                sx={{ 
                  height: 10, 
                  borderRadius: 5,
                  backgroundColor: 'rgba(33, 150, 243, 0.2)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#2196f3',
                    borderRadius: 5,
                  }
                }}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom color="primary">
              Medical Recommendations
            </Typography>
            <List>
              {diagnosis.recommendations.map((rec, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary={rec} />
                </ListItem>
              ))}
            </List>

            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'space-between' }}>
              <Button 
                variant="contained" 
                startIcon={<ArrowBack />}
                onClick={() => navigate('/user-selection')}
              >
                Back
              </Button>
              {userType !== "Patient" ? <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={() => navigate('/drug-simulation')}
              >
                Proceed to Drug Simulation
              </Button> : ""}
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default InitialDiagnosis; 