import { RootState } from "../store";

export const getToasts = (state: RootState) => state.toastStatus.toasts;
