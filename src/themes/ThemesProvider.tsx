import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey, pink } from "@mui/material/colors";
import React, { FC } from "react";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Roboto",
      fontSize: "14px",
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: grey[700],
    },
    secondary: {
      main: pink[500],
    },
  },
});

type AppThemeProviderProp = {
  children?: React.ReactNode;
};

export const AppThemeProvider: FC<AppThemeProviderProp> = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
