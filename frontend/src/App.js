import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import UserSelection from './pages/UserSelection';
import InitialDiagnosis from './pages/InitialDiagnosis';
import DrugSimulation from './pages/DrugSimulation';
import Summary from './pages/Summary';
import Navbar from './components/Navbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<UserSelection />} />
            <Route path="/diagnosis" element={<InitialDiagnosis />} />
            <Route path="/drug-simulation" element={<DrugSimulation />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 