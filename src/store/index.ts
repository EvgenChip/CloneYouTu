import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./../Types";
import { configureStore } from "@reduxjs/toolkit";
import { getHomePageVideo } from "./reducers/getHomePageVideo";
import { getSearchPageVideos } from "./reducers/getSearchPageVideo";
import { getVideoDetails } from "./reducers/getVideoDetails";
import { AuthSlice } from "./auth/authSlice";
import { FavoritesSlice } from "./favorites/favoritesSlice";
import { HistorySlice } from "./history/historySlice";

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
  reducers: {
    clearVideos: (state) => {
      state.videos = [];
      state.nextPageToken = null;
    },
    changeSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomePageVideo.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getVideoDetails.fulfilled, (state, action) => {
      state.currentPlaying = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    mainApp: MainAppSlice.reducer,
    auth: AuthSlice.reducer,
    favorites: FavoritesSlice.reducer,
    history: HistorySlice.reducer,
  },
});

export const { clearVideos, changeSearchTerm, clearSearchTerm } =
  MainAppSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
