import { Box } from "@mui/material";

import { SideList } from "../sideList/SideList";
import { FC, useEffect } from "react";
import { CardList } from "../cardList/CardList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getHomePageVideo } from "../../store/reducers/getHomePageVideo";
import { appContentWrapper } from "./styles";
import InfiniteScroll from "react-infinite-scroll-component";
import { clearVideos } from "../../store";

type ContentAreaProps = { open: boolean };

export const ContentArea: FC<ContentAreaProps> = ({ open }) => {
  const sideOpen = open ? "70px" : "250px";
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.mainApp.videos);
  console.log("data", videos);

  useEffect(() => {
    dispatch(getHomePageVideo(false));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearVideos());
    };
  }, [dispatch]);

  return (
    <Box component="main" sx={appContentWrapper}>
      <Box
        component="div"
        sx={{
          flexBasis: sideOpen,
          flexGrow: 0,
          flexShrink: 0,
          overflowY: "auto",
        }}>
        <SideList />
      </Box>
      {videos.length ? (
        <InfiniteScroll
          dataLength={videos.length}
          next={() => dispatch(getHomePageVideo(true))}
          hasMore={videos.length < 500}
          loader={"Loading..."}
          height={900}>
          <Box
            component="div"
            sx={{
              flexGrow: 1,
              p: 1,
              overflowY: "auto",
              overflowX: "hidden",
              width: `calc(100vw - ${sideOpen})`,
            }}>
            <CardList items={videos} />
          </Box>
        </InfiniteScroll>
      ) : (
        "Loading"
      )}
    </Box>
  );
};
