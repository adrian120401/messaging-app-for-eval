import { Platform } from "react-native";

const BASE_URL = "http://192.168.0.225:3000";
const API_BASE_URL = `${BASE_URL}/api`;
const SOCKET_BASE_URL = BASE_URL;

const getApiUrl = () => {
  if (Platform.OS === "ios") {
    return API_BASE_URL;
  } else if (Platform.OS === "android") {
    return API_BASE_URL.replace("localhost", "10.0.2.2");
  } else {
    return API_BASE_URL.replace("localhost", "192.168.0.222");
  }
};

const getSocketUrl = () => {
  if (Platform.OS === "ios") {
    return SOCKET_BASE_URL;
  } else if (Platform.OS === "android") {
    return SOCKET_BASE_URL.replace("localhost", "10.0.2.2");
  } else {
    return SOCKET_BASE_URL.replace("localhost", "192.168.0.222");
  }
};

export const config = {
  apiUrl: getApiUrl(),
  socketUrl: getSocketUrl(),
  baseUrl: BASE_URL,
};
