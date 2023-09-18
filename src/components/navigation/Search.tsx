import { Box } from "@mui/system";
import { BsFillMicFill } from "react-icons/bs";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import { flexAlignCenter } from "../../styles/styles";
import { searchBar } from "./style";
import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeSearchTerm, clearVideos } from "../../store";
import { getSearchPageVideos } from "../../store/reducers/getSearchPageVideo";

export const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.mainApp.searchTerm);

  const handleSearch = () => {
    if (location.pathname !== "/search") {
      navigate("/search");
    } else {
      dispatch(getSearchPageVideos("startPage"));
    }
  };

  return (
    <Box sx={flexAlignCenter}>
      <Paper component="form" sx={searchBar}>
        <InputBase
          value={searchTerm}
          onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
          sx={{ ml: 1, flex: 1, pl: 1 }}
          placeholder="Search..."
        />
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          type="button"
          sx={{ backgroundColor: "#eee", borderRadius: 0 }}
          aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Button sx={{ minWidth: "auto" }}>
        <BsFillMicFill size={18} />
      </Button>
    </Box>
  );
};
