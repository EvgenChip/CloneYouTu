import { Box } from "@mui/system";
import { BsFillMicFill } from "react-icons/bs";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import { flexAlignCenter } from "../../styles/styles";
import { searchBar } from "./style";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeSearchTerm } from "../../store";

export const Search = () => {
  const searchTerm = useAppSelector((state) => state.mainApp.searchTerm);
  const [searchStr, setSearchStr] = useState(searchTerm);
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleSearch = () => {
    dispatch(changeSearchTerm(searchStr));

    if (location.pathname !== "/search") {
      navigate("/search");
    }
  };

  useEffect(() => {
    if (!searchTerm) {
      navigate("/");
    }
  }, []);

  return (
    <Box sx={flexAlignCenter}>
      <Paper sx={searchBar}>
        <InputBase
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          onKeyUp={(e) => {
            e.preventDefault();
            if (e.key === "Enter" || e.keyCode === 13) {
              handleSearch();
            }
          }}
          sx={{ ml: 1, flex: 1, pl: 1 }}
          placeholder="Search..."
        />
        <IconButton
          onClick={() => {
            handleSearch();
          }}
          type="button"
          sx={{ backgroundColor: "#eee", borderRadius: 0 }}
          aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Button sx={{ minWidth: "auto" }} disabled>
        <BsFillMicFill size={18} />
      </Button>
    </Box>
  );
};
