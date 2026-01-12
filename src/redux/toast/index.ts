import { createSlice } from "@reduxjs/toolkit";

import { toastReducers } from "./toast.reducer";
import { ToastSlice } from "./toast.types";

const initialState: ToastSlice = {
    toasts: [],
};

export const toastSlice = createSlice({
    name: "toastSlice",
    initialState,
    reducers: toastReducers,
});

export const { addToast, removeToast, clearToasts } = toastSlice.actions;
