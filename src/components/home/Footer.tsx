import { Box, Button } from "@mui/material";
import Typography  from "@mui/material/Typography";
import { homepageStyles } from "../style/homepage-styles";
const Footer = () => {
  return (
    <Box sx={homepageStyles.footerContainer}>
      <Button variant="contained" sx={homepageStyles.footerBtn}>View Articles</Button>
      <Typography sx={homepageStyles.footerText}>Made With &#x1F498; BY Nitish Kumar</Typography>
      <Button variant="contained" sx={homepageStyles.footerBtn}>Publish One</Button>
    </Box>
  );
};

export default Footer;
