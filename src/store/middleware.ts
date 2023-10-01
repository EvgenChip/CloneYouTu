import { setUser } from "./auth/authSlice";
import { createListenerMiddleware } from "@reduxjs/toolkit";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: setUser,
  effect: async (action) => {
    console.log("User added: ", action);
  },
});
