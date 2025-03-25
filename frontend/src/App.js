/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 React themes
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import SignIn from "layouts/pages/authentication/sign-in";
import Navbar from "components/Navbar";
import UserSelection from "pages/UserSelection";
import InitialDiagnosis from "pages/InitialDiagnosis";
import DrugSimulation from "pages/DrugSimulation";
import Summary from "pages/Summary";
import './style.css';

export default function App() {
  const { pathname } = useLocation();
  const [isShowNavBar, setIsShowNavBar] = useState(false);

  useEffect(() => {
    const compare = pathname.includes("sign-in") || pathname.includes("home");
    setIsShowNavBar(compare)
  }, [pathname]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isShowNavBar ? <Navbar /> : ""}
      <Routes>
        <Route path="/" element={<Navigate to="/pages/authentication/sign-in" />} />
        <Route path="/pages/authentication/sign-in" element={<SignIn />} />
        <Route path="/home" element={<Presentation />} />
        <Route path="/user-selection" element={<UserSelection />} />
        <Route path="/diagnosis" element={<InitialDiagnosis />} />
        <Route path="/drug-simulation" element={<DrugSimulation />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </ThemeProvider>
  );
}
