import { AiFillYoutube } from "react-icons/ai";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import React, { FC } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { flexAlignCenter, hideOnMobile } from "../../styles/styles";
import { Search } from "./Search";
import { UserProfile } from "../UserProfile";
import { appBar, logoText, toolbarWrapper } from "./style";

type NavMenuProps = { handleSideToggle: () => void };

export const NavMenu: FC<NavMenuProps> = ({ handleSideToggle }) => {
  return (
    <AppBar component="nav" sx={appBar}>
      <Toolbar>
        <Box sx={toolbarWrapper}>
          <Box sx={flexAlignCenter}>
            <IconButton
              onClick={handleSideToggle}
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <AiFillYoutube size={32} />
            <Typography variant="h6" component="div" sx={logoText}>
              YouTube
            </Typography>
          </Box>
          <Box sx={hideOnMobile}>
            <Search />
          </Box>
          <Box sx={hideOnMobile}>
            <UserProfile />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
