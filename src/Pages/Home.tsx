import { ContentArea } from "../components/contentArea/ContentArea";
import { NavMenu } from "../components/navigation/NavMenu";
import { Box } from "@mui/material";
import { appWrapper } from "../styles/styles";
import { useState } from "react";

const Home = () => {
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

export default Home;