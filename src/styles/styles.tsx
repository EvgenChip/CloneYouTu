/***********************
 * App.js
 ************************/
export const appWrapper = {
  display: "flex",
  height: "100vh",
  overflow: "hidden",
};

export const flexAlignCenter = {
  display: "flex",
  alignItems: "center",
};

export const flexColumnGrow = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
};

export const flexColumnCenter = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export const inlineText = { display: "inline", fontSize: 12 };

export const flex = { display: "flex" };

export const scrollWrapper = {
  overflowY: "scroll",
  "::-webkit-scrollbar": { height: "3px" },
};
export const hideOnMobile = { display: { xs: "none", sm: "flex" } };
