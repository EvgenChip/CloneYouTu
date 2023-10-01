import { Box, Button } from "@mui/material";
import { FC } from "react";

import { FaUserCircle } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";

import { inlineText } from "../styles/styles";

import { useToggle } from "../hooks/userToggle";
import { useAppDispatch } from "../store/hooks";

import { useAuth } from "../store/auth/useAuth";
import { logoutAction } from "../store/auth/actions/authActions";

import { useNavigate } from "react-router-dom";

export const UserProfile: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userEl, open, handleClick, handleClose } = useToggle();
  const { isAuth, email } = useAuth();

  const userName = isAuth ? email : "Гость";
  const logButtonTitle = isAuth ? "Выйти" : "Войти";

  const handleLogClick = () => {
    isAuth ? dispatch(logoutAction()) : navigate("/login");
  };

  return (
    <Box sx={{ px: 1 }}>
      <Button onClick={handleClick} id="profile-button">
        <FaUserCircle size={24} />
      </Button>
      <Menu
        anchorEl={userEl}
        onClose={handleClose}
        open={open}
        id="profile-menu"
        MenuListProps={{
          "aria-labelledby": "profile-button",
        }}>
        <ListItem sx={{ pt: 0, pb: 1 }} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Chanel avatar" />
          </ListItemAvatar>
          <ListItemText
            primary={userName}
            secondary={
              <>
                <Typography sx={inlineText} component="span">
                  <Link href="#" underline="none">
                    manage Google Acc
                  </Link>
                </Typography>
              </>
            }></ListItemText>
        </ListItem>
        <Box sx={{ minWidth: 300, borderTop: "1px solid #ddd" }}>
          <List sx={{ p: 0 }}>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogClick}>
                <ListItemText primary={logButtonTitle} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Menu>
    </Box>
  );
};
