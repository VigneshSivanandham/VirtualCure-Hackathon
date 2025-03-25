import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

import MKTypography from "components/MKTypography";

// Images
import vcLogo from "assets/images/logo.png";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "VirtualCure",
    image: vcLogo,
    route: "/",
  },
  socials: [
    {
      icon: <GitHubIcon />,
      link: "http://github.com/VigneshSivanandham/VirtualCure-Hackathon",
    },
    {
      icon: <FacebookIcon />,
      link: "#",
    },
    {
      icon: <TwitterIcon />,
      link: "#",
    },

    {
      icon: <YouTubeIcon />,
      link: "#",
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date}{" "}
      <MKTypography
        component="a"
        href="#"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
        VirtualCure
      </MKTypography>
      .
    </MKTypography>
  ),
};
