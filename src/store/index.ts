import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./../Types";
import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./auth/authSlice";
import { FavoritesSlice } from "./favorites/favoritesSlice";
import { HistorySlice } from "./history/historySlice";
import { middleware, reducer, reducerPath } from "../api/api";
import { listenerMiddleware } from "./middleware";

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
    setNextPageToken: (state, action: PayloadAction<string>) => {
      state.nextPageToken = action.payload;
    },
    changeSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
  },
});

export const store = configureStore({
  reducer: {
    mainApp: MainAppSlice.reducer,
    [reducerPath]: reducer,
    auth: AuthSlice.reducer,
    favorites: FavoritesSlice.reducer,
    history: HistorySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware, listenerMiddleware.middleware),
});

export const {
  clearVideos,
  changeSearchTerm,
  clearSearchTerm,
  setNextPageToken,
} = MainAppSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
