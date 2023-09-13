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

export const UserProfile: FC = () => {
  const { userEl, open, handleClick, handleClose } = useToggle();

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
            primary="Evgen"
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
              <ListItemButton>
                {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                <ListItemText primary="HI" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Menu>
    </Box>
  );
};
