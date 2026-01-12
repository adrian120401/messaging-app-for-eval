import {
  combineReducers,
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import { chatsSlice } from "./chat";
import { globalSlice } from "./global";
import { toastSlice } from "./toast";

const RESET_ACTION = "reset";

const rootReducer = combineReducers({
  globalStatus: globalSlice.reducer,
  chatStatus: chatsSlice.reducer,
  toastStatus: toastSlice.reducer,
});

export const resetStore = createAction(RESET_ACTION);

export const reducerWithReset = (state: any, action: any) => {
  if (action.type === resetStore.type) {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export const store = configureStore({
  reducer: reducerWithReset,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
