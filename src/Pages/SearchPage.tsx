import { NavMenu } from "../components/navigation/NavMenu";
import { Box, Card } from "@mui/material";
import { appWrapper } from "../styles/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { clearVideos } from "../store";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideo";
import { AppCard } from "../components/card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { appContentWrapper } from "../components/contentArea/styles";
import { SideList } from "../components/sideList/SideList";

export const SearchPage = () => {
  const [openSide, setOpenSide] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.mainApp.videos);
  const searchTerm = useAppSelector((state) => state.mainApp.searchTerm);
  const sideOpen = openSide ? "70px" : "250px";

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === "") navigate("/");
    else {
      dispatch(getSearchPageVideos("startPage"));
    }
  }, [dispatch, navigate, searchTerm]);

  const handleSideToogle = () => {
    setOpenSide(!openSide);
  };
  return (
    <Box sx={appWrapper}>
      <NavMenu handleSideToggle={handleSideToogle} />
      {/* <ContentArea open={openSide} /> */}
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
        {items.length ? (
          <InfiniteScroll
            dataLength={items.length}
            next={() => dispatch(getSearchPageVideos("nextPage"))}
            hasMore={items.length < 500}
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
              <Card sx={{ maxWidth: 345, ml: 50 }}>
                {items.length &&
                  items.map((item: any) => {
                    const duration = item.duration;
                    const videoId = item.videoId;
                    const thumbnails = item.thumbnail;
                    const title = item.title;
                    const {
                      id: key,
                      image: channelImage,
                      name: channelTitle,
                    } = item.channelInfo;

                    return (
                      <AppCard
                        duration={duration}
                        url={thumbnails}
                        title={title}
                        channelTitle={channelTitle}
                        videoId={videoId}
                        channelImage={channelImage}
                      />
                    );
                  })}
              </Card>
            </Box>
          </InfiniteScroll>
        ) : (
          "Loading"
        )}
      </Box>
    </Box>
  );
};
