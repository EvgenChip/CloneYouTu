import { createSlice } from "@reduxjs/toolkit";
import { updateStateHistory } from "./action/historyAction";

export type HistoryState = {
  history: string[];
};
const initialState: HistoryState = {
  history: [],
};

export const HistorySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //         .addCase(addToHistory.pending, (state) => {
      //           state.error = undefined;
      //         })
      //         .addCase(addToHistory.rejected, (state, action) => {
      //           state.error = action.error.code;
      //         })
      //         .addCase(removeFromHistory.pending, (state) => {
      //           state.error = undefined;
      //         })
      //         .addCase(removeFromHistory.rejected, (state, action) => {
      //           state.error = action.error.code;
      //         })
      //         .addCase(removeAllFromHistory.pending, (state) => {
      //           state.error = undefined;
      //         })
      //         .addCase(removeAllFromHistory.rejected, (state, action) => {
      //           state.error = action.error.code;
      //         })
      //         .addCase(updateHistoryState.pending, (state) => {
      //           state.error = undefined;
      //         })
      .addCase(updateStateHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      });
    //         .addCase(updateHistoryState.rejected, (state, action) => {
    //           state.error = action.error.code;
    //         })
    //         .addCase(resetHisoryStore, (state, action) => {
    //           state.history = action.payload;
    //           state.error = undefined;
    //         })
    //         .addCase(historyLoaded, (state, action) => {
    //           state.isLoaded = action.payload;
    //         });
  },
});
