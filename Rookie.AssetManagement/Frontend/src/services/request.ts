import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getLocalStorage } from "src/utils/localStorage";

const config: AxiosRequestConfig = {
  baseURL: "/",
};

class RequestService {
  public axios: AxiosInstance;

  constructor() {
    this.axios = axios.create(config);
    this.axios.interceptors.request.use(
      function (config) {
        if (!config.headers.Authorization) {
          config.headers.Authorization = "Bearer " + getLocalStorage("token");
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  public setAuthentication(accessToken: string) {
    // this.axios.defaults.headers.common[
    //   "Authorization"
    // ] = `Bearer ${accessToken}`;
  }
}

export default new RequestService();
