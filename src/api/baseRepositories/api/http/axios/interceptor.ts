import { store, resetStore } from "../../../../../redux/store";
import { deleteToken } from "../../../../../utils/storage";

export const authInterceptor = async (config: any) => {
  if (!config || !config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
  }

  const state = store.getState();
  const token = state.globalStatus.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export const unauthorizedInterceptor = async (error: any) => {
  if (error.response && error.response.status === 401) {
    store.dispatch(resetStore());
    await deleteToken();
  }
  return Promise.reject(error);
};
