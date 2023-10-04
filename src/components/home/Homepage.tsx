import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { homepageStyles } from "../style/homepage-styles";

const Homepage = () => {
  return (
    <Box sx={homepageStyles.container}>
      <Box sx={homepageStyles.wrapper}>
        <Typography sx={homepageStyles.text}>
          Write and Share Your Blog With Millions Of People
        </Typography>
        <img
          width="50%"
          height="50%"
          // @ts-ignore
          style={homepageStyles.image}
          src="/blog.jpg"
          alt="Blog"
        />
      </Box>
      <Box sx={homepageStyles.wrapper}>
      <img
          width="50%"
          height="50%"
          // @ts-ignore
          style={homepageStyles.image}
          src="/publish.jpg"
          alt="Publish"
        />
        <Typography sx={homepageStyles.text}>
          Write and Share Your Blog With Millions Of People
        </Typography>
        
      </Box>
      <Box sx={homepageStyles.wrapper}>
        <Typography sx={homepageStyles.text}>
          Write and Share Your Blog With Millions Of People
        </Typography>
        <img
          width="50%"
          height="50%"
          // @ts-ignore
          style={homepageStyles.image}
          src="/articles.jpg"
          alt="Articles"
        />
      </Box>
    </Box>
  );
};

export default Homepage;
