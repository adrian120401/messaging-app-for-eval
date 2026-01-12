import { PayloadAction } from "@reduxjs/toolkit";
import { Toast, ToastSlice } from "./toast.types";

export const toastReducers = {
    addToast: (state: ToastSlice, action: PayloadAction<Toast>) => {
        state.toasts.push(action.payload);
    },
    removeToast: (state: ToastSlice, action: PayloadAction<string>) => {
        state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
    clearToasts: (state: ToastSlice) => {
        state.toasts = [];
    },
};
