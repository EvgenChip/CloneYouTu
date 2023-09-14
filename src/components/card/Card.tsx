import Avatar from "@mui/material/Avatar";
import Box from "@mui/system/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { flexColumnCenter } from "../../styles/styles";
import { FC } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Typography } from "@mui/material";
import { trimText } from "../../data/data";
import { appCardList } from "./styles";

type AppContentProps = {
  url: string;
  title: string;
  channelTitle: string;
  videoId: string;
  channelImage: string;
};

export const AppCard: FC<AppContentProps> = ({
  url,
  title,
  channelTitle,
  videoId,
  channelImage,
}) => {
  return (
    <Card sx={{ boxShadow: 0 }}>
      <Link href={`https://www.youtube.com/watch?v=${videoId}`}>
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
