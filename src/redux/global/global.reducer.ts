import { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../api/domain/auth/auth.types";
import { GlobalSlice } from "./global.types";

export const globalReducers = {
  setToken: (state: GlobalSlice, action: PayloadAction<string | undefined>) => {
    state.token = action.payload;
  },
  setUser: (state: GlobalSlice, action: PayloadAction<User | undefined>) => {
    state.user = action.payload;
  },
};
