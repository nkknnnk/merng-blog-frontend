import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Tabs,
  Tab,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { ImBlogger } from "react-icons/im";
import { BiLogInCircle } from "react-icons/bi";
import { headerStyles } from "../style/header.styles";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserMenu from "./user/UserMenu";

const Header = () => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state: any) => state.isLoggedIn);

  const [value, setValue] = useState(0);
  return (
    <AppBar sx={headerStyles.appBar}>
      <Toolbar>
        <ImBlogger
          size="40px"
          style={{
            borderRadius: "50%",
            padding: "10px",
            backgroundColor: "#6c5252",
          }}
        />
        {isLoggedIn&&<Box onClick={()=>navigate("/add")} sx={headerStyles.addLink}>
          <Typography fontSize={20} fontFamily="Work Sans">Post New Blog</Typography>
          <IconButton color="inherit">
            <ImBlogger />
          </IconButton>
        </Box>}
        <Box sx={headerStyles.tabContainer}>
          <Tabs
            textColor="inherit"
            // indicatorColor="primary"
            TabIndicatorProps={{ style: { background: "white" } }}
            value={value}
            onChange={(e, val) => {
              setValue(val);
            }}
          >
            {/* @ts-ignore */}
            <Tab LinkComponent={Link} to="/" label="Home" />
            {/* @ts-ignore */}
            <Tab LinkComponent={Link} to="/blogs" label="Blogs" />
          </Tabs>
          {isLoggedIn ? (
            <>
              <UserMenu />
            </>
          ) : (
            <Link to="/auth">
              <Button endIcon={<BiLogInCircle />} sx={headerStyles.authBtn}>
                Auth
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
