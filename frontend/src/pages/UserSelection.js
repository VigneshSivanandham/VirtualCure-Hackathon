import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
} from '@mui/material';

const UserSelection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    symptoms: [],
  });

  const commonSymptoms = [
    'Fever',
    'Headache',
    'Cough',
    'Fatigue',
    'Nausea',
    'Body ache',
    'Sore throat',
    'Shortness of breath',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSymptomSelect = (symptom) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store user data in localStorage for use across pages
    localStorage.setItem('userData', JSON.stringify(formData));
    navigate('/diagnosis');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Patient Information
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              required
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />
            <FormControl fullWidth required>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Select Symptoms
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {commonSymptoms.map((symptom) => (
                  <Chip
                    key={symptom}
                    label={symptom}
                    onClick={() => handleSymptomSelect(symptom)}
                    color={formData.symptoms.includes(symptom) ? 'primary' : 'default'}
                    sx={{ m: 0.5 }}
                  />
                ))}
              </Box>
            </Box>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              disabled={!formData.name || !formData.age || !formData.gender}
            >
              Proceed to Diagnosis
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default UserSelection; 