import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios"; // Import InternalAxiosRequestConfig and AxiosError
import { getLocalStorageItem } from "./localStorage";

// Define the type for the return value of getLocalStorageItem.  It's likely string or null:
const getAccessToken = (): string | null => {
  const token = getLocalStorageItem("accessToken");
  return typeof token === "string" ? token : null;
};

const api = "http://localhost:8080"; // Correct variable name (if using CRA)

if (!api) {
  alert("REACT_APP_API_URL environment variable is not defined!");
  throw new Error("REACT_APP_API_URL environment variable is not defined!"); // Or handle gracefully
}

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: api,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken(); // Use the typed function

    if (accessToken) {
      // @ts-expect-error
      
      config.headers = {
        ...config.headers,
        "x-access-token": accessToken,
      };
    }
    return config;
  },
  (error: AxiosError) => {
    // Type the error
    return Promise.reject(error);
  }
);
