import Avatar from "@mui/material/Avatar";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { flexColumnCenter } from "../../styles/styles";
import { FC } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Typography } from "@mui/material";
import { trimText } from "../../data/data";
import { appCardList } from "./styles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

type Props = {
  url: string;
  title: string;
  channelTitle: string;
  videoId: string;
  channelImage: string;
  duration: string;
};

export const AppCard: FC<Props> = ({
  url,
  title,
  channelTitle,
  videoId,
  channelImage,
  duration,
}) => {
  return (
    <Card sx={{ boxShadow: 0, position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          bgcolor: "black",
          color: "white",
          mt: 28,
          ml: 43,
        }}>
        <Typography>{duration}</Typography>
      </Box>
      <Link to={`/watch/${videoId}`}>
        <CardMedia component="img" height="240" image={url} alt={title} />
      </Link>
      <CardContent sx={{ m: 0, p: 0 }}>
        <List sx={appCardList}>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt="Channel avatar" src={channelImage} />
            </ListItemAvatar>
            <Box sx={flexColumnCenter}>
              <Typography
                sx={{ fontWeight: "bold", mb: 1 }}
                gutterBottom
                variant="h5"
                component="div">
                {trimText(title)}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ mr: 1, mb: 0, p: 0 }}
                  gutterBottom
                  variant="h5"
                  component="div">
                  {channelTitle}
                </Typography>
                <AiFillCheckCircle />
              </Box>
            </Box>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

AppCard.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  channelTitle: PropTypes.string,
  videoId: PropTypes.string,
  channelImage: PropTypes.string,
  duration: PropTypes.string,
};