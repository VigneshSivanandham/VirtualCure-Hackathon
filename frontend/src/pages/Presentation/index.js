import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Presentation page sections
import Counters from "pages/Presentation/sections/Counters";
import Information from "pages/Presentation/sections/Information";

// Routes
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/bg-presentation.jpg";

function Presentation() {
  const backgroundStyles = {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "top",
    display: "grid",
    placeItems: "center",
  };

  const cardStyles = ({ palette, functions, boxShadows }) => ({
    p: 2,
    mx: { xs: 2, lg: 3 },
    mt: -8,
    mb: 4,
    backgroundColor: functions.rgba(palette.white.main, 0.8),
    backdropFilter: "saturate(200%) blur(30px)",
    boxShadow: boxShadows.xxl,
  });

  return (
    <>
      <DefaultNavbar routes={[]} sticky />

      {/* Hero Section */}
      <MKBox minHeight="75vh" width="100%" sx={backgroundStyles}>
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography }) => ({
                [breakpoints.down("md")]: { fontSize: typography.size["3xl"] },
              })}
            >
              VirtualCure
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              AI-Powered Personalized Healthcare & Predictive Medicine
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
              fontSize="1rem"
            >
              Smarter, Safer, & Personalized Healthcare at Your Fingertips!
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>

      {/* Main Content */}
      <Card sx={cardStyles}>
        <Counters />
        <Information />
      </Card>

      {/* Footer */}
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Presentation;
