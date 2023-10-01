import { Box } from "@mui/material";

import { SideList } from "../sideList/SideList";
import { appContentWrapper } from "./styles";
import { useAwesomeSearchVideo } from "../../api/hooks";

import { Content } from "../Content";

type ContentAreaProps = { open: boolean };

export const ContentArea: React.FC<ContentAreaProps> = ({ open }) => {
  const sideOpen = open ? "70px" : "250px";
  const { data, nextPageToken } = useAwesomeSearchVideo({
    ignoreSearch: true,
  });

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
      <Content
        videos={data}
        nextPageToken={nextPageToken}
        sideOpen={sideOpen}
      />
    </Box>
  );
};
