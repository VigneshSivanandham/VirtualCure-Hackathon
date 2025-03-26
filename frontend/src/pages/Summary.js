/* eslint-disable */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import {
  Person,
  LocalHospital,
  Science,
  Assignment,
  CheckCircle,
  Warning,
} from "@mui/icons-material";

const Summary = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    user: null,
    diagnosis: null,
    simulation: null,
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const diagnosisData = localStorage.getItem("diagnosisData");
    const simulationData = localStorage.getItem("simulationData");

    if (!userData || !diagnosisData || !simulationData) {
      navigate("/");
      return;
    }

    setData({
      user: JSON.parse(userData),
      diagnosis: JSON.parse(diagnosisData),
      simulation: JSON.parse(simulationData),
    });
  }, [navigate]);

  if (!data.user || !data.diagnosis || !data.simulation) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Virtual Cure Summary Report
        </Typography>

        <Grid container spacing={4}>
          {/* Patient Information */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  <Person sx={{ mr: 1, verticalAlign: "middle" }} />
                  Patient Information
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText />
                  </ListItem>
                  <ListItem>
                    <ListItemText />
                  </ListItem>
                  <ListItem>
                    <ListItemText />
                  </ListItem>
                </List>
                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  Reported Symptoms:
                </Typography>
                <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {data.user.symptoms.map((symptom, index) => (
                    <Chip
                      key={index}
                      label={symptom}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Diagnosis Results */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  <Assignment sx={{ mr: 1, verticalAlign: "middle" }} />
                  Diagnosis Results
                </Typography>
                <Typography variant="body1" paragraph>
                  {data.diagnosis.diagnosis}
                </Typography>
                <Box sx={{ my: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Confidence Level:{" "}
                    {(data.diagnosis.confidence * 100).toFixed(1)}%
                  </Typography>
                  <div
                    style={{
                      width: `${data.diagnosis.confidence * 100}%`,
                      height: "8px",
                      backgroundColor: "#2196f3",
                      borderRadius: "4px",
                    }}
                  />
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Recommendations:
                </Typography>
                <List dense>
                  {data.diagnosis.recommendations.map((rec, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircle color="success" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={rec} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Drug Simulation Results */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  <Science sx={{ mr: 1, verticalAlign: "middle" }} />
                  Drug Simulation Results
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Effectiveness:{" "}
                  {(data.simulation.effectiveness * 100).toFixed(1)}%
                </Typography>
                <div
                  style={{
                    width: `${data.simulation.effectiveness * 100}%`,
                    height: "8px",
                    backgroundColor: "#4caf50",
                    borderRadius: "4px",
                    marginBottom: "16px",
                  }}
                />
                <Typography variant="subtitle2" gutterBottom>
                  Potential Side Effects:
                </Typography>
                <List dense>
                  {data.simulation.side_effects.map((effect, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <Warning color="warning" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={effect} />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Treatment Recommendations:
                </Typography>
                <List dense>
                  {data.simulation.recommendations.map((rec, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <LocalHospital color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={rec} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            onClick={() => {
              localStorage.clear();
              navigate("/user-selection");
            }}
          >
            Re-diagnoise
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export { Summary };
export default Summary;
