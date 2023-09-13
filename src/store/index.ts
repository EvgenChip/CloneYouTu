import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./../Types";
import { configureStore } from "@reduxjs/toolkit";
import { getHomePage } from "./reducers/getHomePage";

const initialState: InitialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: "",
  searchResults: [],
  nextPageToken: null,
  recommendedVideos: [],
};

const MainAppSlice = createSlice({
  name: "mainApp",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomePage.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
  },
});

export const setupStore = configureStore({
  reducer: {
    mainApp: MainAppSlice.reducer,
  },
});
export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispatch = typeof setupStore.dispatch;
