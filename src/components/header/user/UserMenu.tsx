import { IconButton, Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { FaUserNurse } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-slice";
const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate("/");
  };
  return (
    <Box>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit">
        <FaUserNurse />
      </IconButton>
      <Menu
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={() => navigate("/profile")}>
          <Typography>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography>Lagout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
