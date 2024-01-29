import axios from "axios";
import { debug } from "../helpers/Logger/index";
import env from "react-dotenv";
const API_URL = "https://localhost:7223/";

// Request Interceptor
const onRequest = (config) => {
  const { method, url, headers } = config;
  // Set Headers Here
  // Check Authentication Here
  // Set Loading Start Here
  debug(
    `🚀 [HOST] ${API_URL} | [API] ${method?.toUpperCase()} ${url} | Request`
  );

  const token = localStorage.getItem("AccessToken");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const onResponse = (response) => {
  const { method, url } = response.config;
  const { status } = response;
  // Set Loading End Here
  // Handle Response Data Here
  // Error Handling When Return Success with Error Code Here
  debug(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`);
  return response.data;
};

const onErrorResponse = (error) => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { method, url } = error.config;
    const { status } = error.response ?? {};

    debug(
      `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`
    );

    if (status === 401) {
      // "Login required"
      // Delete Token & Go To Login Page if you required.
      localStorage.clear();
      window.location.href = "/login";
    }
  } else {
    debug(`🚨 [API] | Error ${error.message}`);
  }

  return Promise.reject(error);
};

const setupInterceptors = (instance) => {
  instance.interceptors.request.use(onRequest, onErrorResponse);
  instance.interceptors.response.use(onResponse, onErrorResponse);
  return instance;
};

const axiosClient = setupInterceptors(
  axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  })
);

export default axiosClient;
