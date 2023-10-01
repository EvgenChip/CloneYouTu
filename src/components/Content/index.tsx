import InfiniteScroll from "react-infinite-scroll-component";
import { CardList } from "../CardList/CardList";
import { Box } from "@mui/material";
import { useAppDispatch } from "../../store/hooks";
import { setNextPageToken } from "../../store";
import { useAwesomeSearchVideo } from "../../api/hooks";

type ContentProps = {
  videos: ReturnType<typeof useAwesomeSearchVideo>["data"];
  nextPageToken: string;
  sideOpen: string;
};

export const Content: React.FC<ContentProps> = ({
  videos,
  nextPageToken,
  sideOpen,
}) => {
  const dispatch = useAppDispatch();
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
