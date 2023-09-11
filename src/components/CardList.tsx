import { Box, Grid } from "@mui/material";
import { FC } from "react";
import { AppCard } from "./Card";

export const CardList: any = ({ items }: any) => {
  return (
    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 4 }}>
        {items.length &&
          items.map((item: any) => {
            const key = item.etag;
            const { videoId } = item.id;
            const { thumbnails, title, channelTitle } = item.snippet;
            return (
              <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
                <AppCard
                  url={thumbnails.high.url}
                  title={title}
                  channelTitle={channelTitle}
                  videoId={videoId}
                />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};
