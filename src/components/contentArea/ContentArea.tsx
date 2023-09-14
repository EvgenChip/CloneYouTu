import { Box } from "@mui/material";

import { SideList } from "../sideList/SideList";
import { FC, useEffect } from "react";
import { CardList } from "../cardList/CardList";
import { youtubeResponse } from "../../data/data";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getHomePageVideo } from "../../store/reducers/getHomePageVideo";
import { appContentWrapper } from "./styles";

type ContentAreaProps = { open: boolean };

export const ContentArea: FC<ContentAreaProps> = ({ open }) => {
  const sideOpen = open ? "70px" : "250px";
  const dispatch = useAppDispatch();
  const response = useAppSelector((state) => state.mainApp.videos);
  console.log(response);

  useEffect(() => {
    dispatch(getHomePageVideo(false));
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
