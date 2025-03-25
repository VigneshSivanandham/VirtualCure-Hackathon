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

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function Information() {

  const userType = sessionStorage.getItem("usertype");

  // const getRoutes = () =>{
  //   switch(userType) {
  //     case 'Doctor':
  //       return '/diagnosis';
  //     case 'Patient':
  //       return '/user-selection';
  //     case 'Researcher':
  //       return '/drug-simulation';
  //   }
  // }

  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="touch_app"
                title={
                  <>
                    Feel the
                    <br />
                    VirtualCure
                  </>
                }
                description="Smarter, Safer, & Personalized Healthcare at Your Fingertips!"
              />
              <RotatingCardBack
                image={bgBack}
                title="Ask VirtualCure"
                description="You will save a lot of time going from prototyping to full-functional AI. AI-Powered Personalized Healthcare & Predictive Medicine VirtualCure UI Overview (Role-Based Access)"
                action={{
                  type: "internal",
                  route: '/user-selection',
                  label: "Ask VirtualCure",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="content_copy"
                  title="My Health (Digital Twin)"
                  description="Patients Only✅ 3D Human Model (🟢 Healthy | 🟡 Monitor | 🔴 Critical)✅ Vitals & Wearable Sync (Heart Rate, BP, Oxygen, Fitbit, Apple Health)✅ AI Predictive Health Score & Preventive Tips✅ AI Alerts (Detects abnormalities & suggests doctor consultation)."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="flip_to_front"
                  title="AI Doctor"
                  description="Doctors Only✅ AI Chat Interface (Symptom analysis & virtual consultation)✅ 3D Digital Twin Simulation (Test treatments before real application)✅ AI-Powered Prescription Preview (Pharmacy integration)."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="price_change"
                  title="AI Medical Research"
                  description="Researchers Only✅ Drug Simulation Dashboard (Predict drug interactions & effectiveness)✅ AI-Generated Insights Panel (Collaborative research & clinical discussions)."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="devices"
                  title="EHR & Wearable Integration"
                  description="Admins Only✅ Wearable Data Panel (Heart Rate, Steps, Glucose Tracking)✅ EHR Timeline Viewer (AI-generated insights, Search & Filter medical history)✅ Privacy & Security Controls (HIPAA, GDPR compliance)."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="devices"
                  title="Smart Health Alerts & Notifications"
                  description="Accessible by All✅ Real-Time Alerts (🚨 Critical → Emergency alerts, ⚠️ Caution → Health concerns, ✅ Normal → Updates)✅ Interactive Notification Center (Health trends, doctor recommendations, reminders)."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
