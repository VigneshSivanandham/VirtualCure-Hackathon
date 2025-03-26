import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import {
  CheckCircle,
  Warning,
  TrendingUp,
  Science,
  LocalHospital,
} from "@mui/icons-material";
import axios from "axios";

const DrugSimulation = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [drugData, setDrugData] = useState([]); // Store drug data from JSON
  const [formData, setFormData] = useState({
    drugName: "",
    dosage: "",
    frequency: "",
    duration: "",
  });
  const [selectedDrug, setSelectedDrug] = useState(null); // Store selected drug details
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("___1");

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    // if (!storedData) {
    //   navigate('/');
    //   return;
    // }
    setUserData(JSON.parse(storedData));

    // Load drug data from external JSON file
    fetch("/drug_data.json")
      .then((response) => response.json())
      .then((data) => setDrugData(data))
      .catch((err) => console.error("Error loading drug data:", err));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update selected drug details dynamically
    if (name === "drugName") {
      const drug = drugData.find((d) => d.name === value);
      setSelectedDrug(drug || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      if (!selectedDrug) {
        setError("Please select a valid drug.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/drug-simulation",
        {
          patient_id: userData?.id || 1,
          drug_name: formData.drugName,
          dosage: parseFloat(formData.dosage),
          frequency: formData.frequency,
          duration: formData.duration,
        }
      );

      // Inject dynamic simulation data
      setSimulation({
        effectiveness: selectedDrug.effectiveness,
        side_effects: selectedDrug.sideEffects,
        recommendations: selectedDrug.recommendations,
      });

      localStorage.setItem("simulationData", JSON.stringify(response.data));
    } catch (err) {
      setError("Failed to simulate drug interaction. Please try again.");
      console.error("Simulation error:", err);
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
                  <Science sx={{ mr: 1, verticalAlign: "middle" }} />
                  Effectiveness Analysis
                </Typography>
                <Typography variant="body1">
                  Expected Effectiveness:{" "}
                  {(simulation.effectiveness * 100).toFixed(1)}%
                </Typography>
                <Box sx={{ mt: 2, mb: 1 }}>
                  <div
                    style={{
                      width: `${simulation.effectiveness * 100}%`,
                      height: "8px",
                      backgroundColor: "#2196f3",
                      borderRadius: "4px",
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
                  <Warning sx={{ mr: 1, verticalAlign: "middle" }} />
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
                  <TrendingUp sx={{ mr: 1, verticalAlign: "middle" }} />
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
              <FormControl fullWidth required>
                <InputLabel>Drug Name</InputLabel>
                <Select
                  name="drugName"
                  value={formData.drugName}
                  onChange={handleChange}
                  style={{ padding: "13px" }}
                >
                  {drugData.map((drug, index) => (
                    <MenuItem key={index} value={drug.name}>
                      {drug.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Dosage (mg)</InputLabel>
                <Select
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                >
                  {[...Array(13)].map((_, i) => (
                    <MenuItem key={i} value={50 + i * 50}>
                      {50 + i * 50} mg
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Times per day"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                label="Duration (days)"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mr: 1 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ mr: 1 }} />
            ) : (
              "Simulate Drug Interaction"
            )}
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
            onClick={() => navigate("/summary")}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ mr: 1 }} />
            ) : (
              "Summary"
            )}
          </Button>
        </Box>

        {renderSimulationResults()}
      </Paper>
    </Container>
  );
};

export default DrugSimulation;
