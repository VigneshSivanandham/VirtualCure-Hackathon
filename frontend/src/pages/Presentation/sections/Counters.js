/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";

function Counters() {
  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container item xs={12} lg={9} sx={{ mx: "auto" }}>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={100}
              suffix="+"
              title="Patient Medical Suggestions"
              description="Patient can able to ask VirtualCure AI to get the medically how to cure, what medicine and tiet should I follow."
            />
          </Grid>
          <Grid item xs={12} md={4} display="flex">
            <Divider
              orientation="vertical"
              sx={{ display: { xs: "none", md: "block" }, mx: 0 }}
            />
            <DefaultCounterCard
              count={100}
              suffix="+"
              title="Doctor's Medicine Suggestions"
              description="Doctor's can able to ask VirtualCure AI to get the medicine list with less or without side effect, based on the patient health condition."
            />
            <Divider
              orientation="vertical"
              sx={{ display: { xs: "none", md: "block" }, ml: 0 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={100}
              suffix="+"
              title="Research Suggestions"
              description="Research person can ask VirtualCure to get the suggestion on the combination of the medicines. So, that it could resolve many diseases."
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Counters;
