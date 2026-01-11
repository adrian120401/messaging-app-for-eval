import axios from "axios";
import { config } from "../../../../config";
import { authInterceptor, unauthorizedInterceptor } from "./interceptor";

const apiClient = axios.create({
  baseURL: config.apiUrl,
  timeout: 120000, // 2 minutes
});

apiClient.interceptors.request.use(authInterceptor);
apiClient.interceptors.response.use(
  (response) => response,
  unauthorizedInterceptor
);

export default apiClient;
