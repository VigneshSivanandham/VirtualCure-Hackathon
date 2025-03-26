// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Custom components
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function Information() {
  return (
    <MKBox
      component="section"
      py={6}
      my={6}
      sx={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", // Dark theme gradient
        color: "white",
        textAlign: "center",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" gutterBottom>
            Experience the Future of Healthcare 🚀
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4 }}>
            AI-Powered Personalized Healthcare & Predictive Medicine.
          </Typography>
        </motion.div>

        {/* Rotating Card */}
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <RotatingCard>
                <RotatingCardFront
                  image={bgFront}
                  icon="touch_app"
                  title="Feel the VirtualCure"
                  description="AI at your fingertips for smarter, safer healthcare!"
                />
                <RotatingCardBack
                  image={bgBack}
                  title="Ask VirtualCure"
                  description="Try AI-powered personalized healthcare now!"
                  action={{
                    type: "internal",
                    route: "/user-selection",
                    label: "Try Now",
                  }}
                />
              </RotatingCard>
            </motion.div>
          </Grid>
        </Grid>

        {/* Feature Grid */}
        <Grid container spacing={3} sx={{ mt: 6 }}>
          {[
            {
              icon: "content_copy",
              title: "My Health (Digital Twin)",
              description: "Live 3D health model, vitals, & AI health score.",
            },
            {
              icon: "flip_to_front",
              title: "AI Doctor",
              description:
                "AI-powered symptom analysis & virtual consultation.",
            },
            {
              icon: "price_change",
              title: "AI Medical Research",
              description:
                "Predict drug interactions & collaborate on research.",
            },
            {
              icon: "devices",
              title: "EHR & Wearable Integration",
              description: "View real-time vitals & medical history securely.",
            },
            {
              icon: "notifications",
              title: "Smart Health Alerts",
              description:
                "Emergency alerts, AI insights, & personalized tips.",
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <DefaultInfoCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Call-to-Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginTop: "40px" }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ borderRadius: "20px", px: 4 }}
          >
            Get Started 🚀
          </Button>
        </motion.div>
      </Container>
    </MKBox>
  );
}

export default Information;
