import { Box } from "@mui/material";
import { appContentWrapper } from "../styles/styles";
import { SideList } from "./SideList";
import { FC } from "react";
import { CardList } from "./CardList";
import { youtubeResponse } from "../data/data";

type ContentAreaProps = { open: boolean };

export const ContentArea: FC<ContentAreaProps> = ({ open }) => {
  const sideOpen = open ? "70px" : "250px";

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
      <Box
        component="div"
        sx={{
          flexGrow: 1,
          p: 1,
          overflowY: "auto",
          overflowX: "hidden",
          width: `calc(100vw - ${sideOpen})`,
        }}>
        <CardList items={youtubeResponse} />
      </Box>
    </Box>
  );
};
