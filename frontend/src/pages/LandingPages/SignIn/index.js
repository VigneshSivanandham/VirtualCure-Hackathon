import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
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
  const navigate = useNavigate();

  const onUserNameChange = (event) => {
    setUserName(event?.target?.value);
  };

  const onUserTypeChange = (event) => {
    sessionStorage.setItem("usertype", event?.target?.value);
  };

  const submitSignIn = () => {
    sessionStorage.setItem("username", userName);
    navigate("/home");
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
            <Card>
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
                  style={{ marginTop: "0px", marginBottom: "-9.5px" }}
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
                      Sign In
                    </MKButton>
                  </MKBox>

                  {/* Sign-Up Link */}
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/authentication/sign-up/cover"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
                      </MKTypography>
                    </MKTypography>
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
