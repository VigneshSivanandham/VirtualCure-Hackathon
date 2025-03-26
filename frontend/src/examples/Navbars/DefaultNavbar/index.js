/* eslint-disable no-param-reassign */
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

// react-router components
import { Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import vcLogo from "assets/images/logo.png";
import { Button } from "@mui/material";

function DefaultNavbar({ image, transparent, light, sticky, relative }) {
  const navigate = useNavigate();
  return (
    <Container sx={sticky ? { position: "", top: 0, zIndex: 10 } : null}>
      <MKBox
        my={relative ? 0 : 2}
        mx={relative ? 0 : 3}
        borderRadius="xl"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        position={relative ? "relative" : "absolute"}
        left={0}
        zIndex={3}
        backgroundColor={"none"}
        width={"auto"}
      >
        <MKBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <MKBox component={Link} to="/" lineHeight={1}>
            <MKTypography
              variant="button"
              fontWeight="bold"
              color={light ? "white" : "dark"}
            >
              {window.innerWidth > 600 ? (
                <MKBox
                  component="img"
                  src={image}
                  alt={"name"}
                  maxWidth="14rem"
                  borderRadius={"0.75rem"}
                />
              ) : (
                ""
              )}
            </MKTypography>
          </MKBox>
        </MKBox>
        <MKBox
          bgColor={transparent ? "white" : "transparent"}
          shadow={transparent ? "lg" : "none"}
          borderRadius="xl"
          px={transparent ? 2 : 0}
        ></MKBox>
      </MKBox>
      <Button
        color="inherit"
        onClick={() => navigate("/")}
        sx={{
          backgroundColor: "trasparent",
          position: "absolute",
          right: 0,
          top: "3rem",
        }}
      >
        Logout
      </Button>
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  brand: "Material Kit 2",
  transparent: false,
  light: false,
  action: false,
  sticky: false,
  relative: false,
  center: false,
  image: vcLogo,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  brand: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.shape).isRequired,
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
      color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "dark",
        "light",
        "default",
        "white",
      ]),
      label: PropTypes.string.isRequired,
    }),
  ]),
  sticky: PropTypes.bool,
  relative: PropTypes.bool,
  center: PropTypes.bool,
};

export default DefaultNavbar;
