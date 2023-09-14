import { Box, Grid } from "@mui/material";
import { AppCard } from "../card/Card";

export const CardList: any = ({ items }: any) => {
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 4 }}>
        {items.length &&
          items.map((item: any) => {
            const videoId = item.videoId;
            const thumbnails = item.thumbnail;
            const title = item.title;
            const {
              id: key,
              image: channelImage,
              name: channelTitle,
            } = item.channelInfo;

            return (
              <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
                <AppCard
                  url={thumbnails}
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
