import { NavMenu } from "../components/navigation/NavMenu";
import { Box } from "@mui/material";
import { appWrapper } from "../styles/styles";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { appContentWrapper } from "../components/contentArea/styles";
import { SideList } from "../components/sideList/SideList";
import { useAwesomeSearchVideo } from "../api/hooks";
import { Content } from "../components/Content";
import { setNextPageToken } from "../store";

export const SearchPage = () => {
  const [openSide, setOpenSide] = useState(false);
  const dispatch = useAppDispatch();

  const searchTerm = useAppSelector((state) => state.mainApp.searchTerm);
  const sideOpen = openSide ? "70px" : "250px";

  const {
    data: items,
    nextPageToken,
    isError,
    isLoading,
  } = useAwesomeSearchVideo();

  useEffect(() => {
    dispatch(setNextPageToken(undefined));
  }, [searchTerm]);

  const handleSideToogle = () => {
    setOpenSide(!openSide);
  };

  return (
    <>
      {items && (
        <Box sx={appWrapper}>
          <NavMenu handleSideToggle={handleSideToogle} />
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
              videos={items}
              nextPageToken={nextPageToken}
              isError={isError}
              isLoading={isLoading}
              sideOpen={sideOpen}
            />
          </Box>
        </Box>
      )}
    </>
  );
};
