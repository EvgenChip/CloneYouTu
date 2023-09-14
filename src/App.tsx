import React, { useState } from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";

import { NavMenu } from "./components/navigation/NavMenu";
import Box from "@mui/material/Box";
import { appWrapper } from "./styles/styles";
import { ContentArea } from "./components/contentArea/ContentArea";

function App() {
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
}

export default App;
