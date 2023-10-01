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
    builder.addCase(updateStateHistory.fulfilled, (state, action) => {
      state.history = action.payload;
    });
  },
});
