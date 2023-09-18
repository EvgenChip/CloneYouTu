import { ContentArea } from "../components/contentArea/ContentArea";
import { NavMenu } from "../components/navigation/NavMenu";
import { Box } from "@mui/material";
import { appWrapper } from "../styles/styles";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { clearVideos } from "../store";
import { getHomePageVideo } from "../store/reducers/getHomePageVideo";

export const Home = () => {
  const dispatch = useAppDispatch();
  const [openSide, setOpenSide] = useState(false);

  const handleSideToogle = () => {
    setOpenSide(!openSide);
  };

  return (
    <Box sx={appWrapper}>
      <NavMenu handleSideToggle={handleSideToogle} />
      <ContentArea open={openSide} />
    </Box>
  );
};
