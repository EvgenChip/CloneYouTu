import { createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  logoutAction,
  registrationAction,
} from "./actions/authActions";

export type AuthState = {
  isAuth: boolean;
  checked: boolean;
  email: string;
  loading: boolean;
  token: string;
  uid: string;
};

const initialState: AuthState = {
  checked: false,
  isAuth: false,
  email: "",
  loading: false,
  token: "",
  uid: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
      state.isAuth = true;
      state.loading = false;
    },
    removeUser: (state) => {
      state.email = "";
      state.token = "";
      state.uid = "";
      state.isAuth = false;
      state.loading = true;
    },
    setUserChecked: (state, action) => {
      state.checked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.loading = false;
    });
    builder.addCase(loginAction.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(registrationAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registrationAction.fulfilled, (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
      state.loading = false;
    });
    builder.addCase(registrationAction.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(logoutAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.isAuth = false;
      state.token = "";
      state.uid = "";
      state.loading = false;
    });
    builder.addCase(logoutAction.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setUser, removeUser, setUserChecked } = AuthSlice.actions;
