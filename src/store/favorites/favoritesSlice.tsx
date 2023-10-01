import { createSlice } from "@reduxjs/toolkit";
import {
  addToFavorites,
  updateStateFavorites,
} from "./actions/favorite.actions";

export type Favorites = {
  id?: string | number;
  title?: string;
  description?: string;
  flagFavorite?: boolean;
};

export type FavoritesState = {
  favorites: Favorites[];
  isLoaded: boolean;
  error: string | undefined;
};
const initialState: FavoritesState = {
  favorites: [],
  isLoaded: false,
  error: undefined,
};

export const FavoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToFavorites.pending, (state) => {
        state.error = undefined;
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.error = action.error.code;
      })
      .addCase(updateStateFavorites.pending, (state) => {
        state.error = undefined;
      })
      .addCase(updateStateFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(updateStateFavorites.rejected, (state, action) => {
        state.error = action.error.code;
      });
  },
});
