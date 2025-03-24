import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  TrendingUp,
  Science,
  LocalHospital,
} from '@mui/icons-material';
import axios from 'axios';

const DrugSimulation = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    drugName: '',
    dosage: '',
    frequency: '',
  });
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (!storedData) {
      navigate('/');
      return;
    }
    setUserData(JSON.parse(storedData));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('http://localhost:8000/drug-simulation', {
        patient_id: userData?.id || 1,
        drug_name: formData.drugName,
        dosage: parseFloat(formData.dosage),
        frequency: formData.frequency,
      });
      setSimulation(response.data);
      // Store simulation data for summary page
      localStorage.setItem('simulationData', JSON.stringify(response.data));
    } catch (err) {
      setError('Failed to simulate drug interaction. Please try again.');
      console.error('Simulation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderSimulationResults = () => {
    if (!simulation) return null;

    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Simulation Results
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  <Science sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Effectiveness Analysis
                </Typography>
                <Typography variant="body1">
                  Expected Effectiveness: {(simulation.effectiveness * 100).toFixed(1)}%
                </Typography>
                <Box sx={{ mt: 2, mb: 1 }}>
                  <div
                    style={{
                      width: `${simulation.effectiveness * 100}%`,
                      height: '8px',
                      backgroundColor: '#2196f3',
                      borderRadius: '4px',
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="error" gutterBottom>
                  <Warning sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Side Effects
                </Typography>
                <List dense>
                  {simulation.side_effects.map((effect, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <LocalHospital color="error" />
                      </ListItemIcon>
                      <ListItemText primary={effect} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Recommendations
                </Typography>
                <List>
                  {simulation.recommendations.map((rec, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText primary={rec} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Drug Simulation
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Drug Name"
                name="drugName"
                value={formData.drugName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Dosage (mg)"
                name="dosage"
                type="number"
                value={formData.dosage}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Frequency (e.g., twice daily)"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={() => navigate('/diagnosis')}>
              Back to Diagnosis
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading || !formData.drugName || !formData.dosage || !formData.frequency}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ mr: 1 }} />
              ) : (
                'Simulate Drug Interaction'
              )}
            </Button>
          </Box>
        </Box>

        {renderSimulationResults()}

        {simulation && (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={() => navigate('/summary')}>
              View Complete Summary
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default DrugSimulation; 