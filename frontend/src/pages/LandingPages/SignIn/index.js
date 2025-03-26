import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKDropdown from "components/MKDropdown";
import SimpleFooter from "examples/Footers/SimpleFooter";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import vcLogo from "assets/images/logo.png";

function SignInBasic() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onUserNameChange = (event) => {
    setUserName(event?.target?.value);
  };

  const onUserTypeChange = (value) => {
    sessionStorage.setItem("usertype", value);
  };

  const submitSignIn = () => {
    setLoading(true);
    sessionStorage.setItem("username", userName);
    setTimeout(() => {
      navigate("/home");
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Background Overlay */}
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({
            functions: { linearGradient, rgba },
            palette: { gradients },
          }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Sign-In Container */}
      <MKBox
        px={1}
        width="100%"
        height="100vh"
        mx="auto"
        position="relative"
        zIndex={2}
      >
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card
              sx={{
                p: 3,
                borderRadius: "20px",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              {/* Logo Section */}
              <MKBox
                variant="gradient"
                bgColor="info"
                coloredShadow="info"
                mx={2}
                mt={-3}
                mb={1}
                textAlign="center"
              >
                <MKBox
                  component="img"
                  src={vcLogo}
                  alt="vclogo"
                  width="100%"
                  opacity={0.7}
                />
              </MKBox>

              {/* Form Section */}
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      type="text"
                      label="Username"
                      fullWidth
                      onChange={onUserNameChange}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKDropdown onChange={onUserTypeChange} required />
                  </MKBox>

                  <MKBox mt={4} mb={1}>
                    <MKButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      onClick={submitSignIn}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Sign In"
                      )}
                    </MKButton>
                  </MKBox>

                  <MKBox mt={1} mb={1}>
                    <MKButton
                      variant="outlined"
                      color="white"
                      fullWidth
                      onClick={() => navigate("/home")}
                    >
                      Explore as Guest
                    </MKButton>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>

      {/* Footer */}
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default SignInBasic;
