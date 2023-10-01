import InfiniteScroll from "react-infinite-scroll-component";
import { CardList } from "../CardList/CardList";
import { Box } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { setNextPageToken } from "../../store";

type ContentProps = {
  videos: any;
  isError: any;
  isLoading: any;
  nextPageToken: any;
  sideOpen: any;
};

export const Content: React.FC<ContentProps> = ({
  videos,
  isError,
  isLoading,
  nextPageToken,
  sideOpen,
}) => {
  const dispatch = useAppDispatch();

  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}>
        loading failed
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}>
        loading...
      </Box>
    );
  }

  if (videos.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}>
        no videos.
      </Box>
    );
  }

  return (
    <Box
      component="div"
      id="scrollableDiv"
      sx={{
        flexGrow: 1,
        p: 1,
        overflowY: "auto",
        overflowX: "hidden",
        width: `calc(100vw - ${sideOpen})`,
      }}>
      <InfiniteScroll
        dataLength={videos.length}
        next={() => dispatch(setNextPageToken(nextPageToken))}
        hasMore={videos.length < 500}
        loader={"Loading..."}
        scrollableTarget="scrollableDiv"
        height={900}>
        <CardList items={videos} />
      </InfiniteScroll>
    </Box>
  );
};
