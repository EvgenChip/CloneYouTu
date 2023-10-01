import { FC } from "react";
import { Box, Grid } from "@mui/material";
import { AppCard } from "../card/Card";
import { useAwesomeSearchVideo } from "../../api/hooks";

type Props = {
  items: ReturnType<typeof useAwesomeSearchVideo>["data"];
};

export const CardList: FC<Props> = ({ items }) => {
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 4 }}>
        {items.length &&
          items.map((item) => {
            const { duration, videoId, thumbnail, title, channelInfo } = item;
            const { image: channelImage, name: channelTitle } = channelInfo;

            return (
              <Grid key={item.videoId} item xs={12} sm={6} md={4} lg={3}>
                <AppCard
                  duration={duration}
                  url={thumbnail}
                  title={title}
                  channelTitle={channelTitle}
                  videoId={videoId}
                  channelImage={channelImage}
                />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};
