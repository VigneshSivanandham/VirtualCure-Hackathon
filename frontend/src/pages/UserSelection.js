import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Stack,
} from "@mui/material";

const UserSelection = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    symptoms: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert symptoms from string to an array
    const symptomsArray = formData.symptoms
      .split(",")
      .map((symptom) => symptom.trim())
      .filter((symptom) => symptom !== "");

    // Store user data in localStorage for use across pages
    localStorage.setItem(
      "userData",
      JSON.stringify({ ...formData, symptoms: symptomsArray })
    );
    navigate("/diagnosis");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper
        elevation={4}
        sx={{ p: 4, borderRadius: "12px", textAlign: "center" }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          🏥 Patient Information
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
              error={formData.name.length > 0 && formData.name.length < 2}
              helperText={
                formData.name.length > 0 && formData.name.length < 2
                  ? "Name must be at least 2 characters"
                  : ""
              }
            />
            <TextField
              required
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              inputProps={{ min: 1 }}
              error={
                formData.age !== "" &&
                (formData.age <= 0 || isNaN(formData.age))
              }
              helperText={
                formData.age !== "" &&
                (formData.age <= 0 || isNaN(formData.age))
                  ? "Enter a valid age"
                  : ""
              }
            />
            <FormControl fullWidth required>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                label="Gender"
                onChange={handleChange}
                style={{ padding: "13px" }}
              >
                <MenuItem value="male">♂️ Male</MenuItem>
                <MenuItem value="female">♀️ Female</MenuItem>
                <MenuItem value="other">⚧️ Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Enter Symptoms (comma-separated)"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              helperText="Example: Fever, Headache, Cough"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 3, py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
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
