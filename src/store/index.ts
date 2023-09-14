import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./../Types";
import { configureStore } from "@reduxjs/toolkit";
import { getHomePageVideo } from "./reducers/getHomePageVideo";

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
    builder.addCase(getHomePageVideo.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
  },
});

export const store = configureStore({
  reducer: {
    mainApp: MainAppSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
