import * as types from "./actionType";
import { axiosInstance } from "../../utils/axiosConfig";
import { Dispatch } from "redux"; // Import Dispatch type
import { AxiosError } from "axios"; // Import AxiosError

// Define types for action payloads
interface LoginSuccessPayload {
  token: string;
}

interface SignupSuccessPayload {
  data: any; // Replace 'any' with the actual type of 'res.data.data'
}

interface CheckBalanceSuccessPayload {
  payload: any; // Replace 'any' with the actual type of 'res.data.payload'
}

interface ErrorPayload {
  payload: string;
}

// Define the types for  actions.  This is important for type safety.
interface AccountLoadingAction {
  type: typeof types.ACCOUNT_LOADING;
}

interface LoginSuccessAction {
  type: typeof types.LOGIN_SUCCESS;
  payload: LoginSuccessPayload;
}

interface SignupSuccessAction {
  type: typeof types.SIGNUP_SUCCESS;
  payload: SignupSuccessPayload;
}

interface CheckBalanceRequestAction {
  type: typeof types.CHECKBALANCE_REQUEST;
}

interface CheckBalanceSuccessAction {
  type: typeof types.CHECKBALANCE_SUCCESS;
  payload: CheckBalanceSuccessPayload;
}

interface AccountErrorAction {
  type: typeof types.ACCOUNT_ERROR;
  payload: ErrorPayload;
}

interface AccountLogoutAction {
  type: typeof types.ACCOUNT_LOGOUT;
}

// Union type for all possible actions
type AuthActionTypes =
  | AccountLoadingAction
  | LoginSuccessAction
  | SignupSuccessAction
  | CheckBalanceRequestAction
  | CheckBalanceSuccessAction
  | AccountErrorAction
  | AccountLogoutAction;

// Improved error handling and typing
const handleAxiosError = (error: AxiosError): string => {
  let errorMessage = "An unknown error occurred. Please try again later.";

  if (error.code === "ERR_NETWORK") {
    errorMessage = "Network error: Unable to connect to the server.";
  } else if (error.response && error.response.status === 503) {
    errorMessage = "Server is not started yet.";
  } else if (error.response && error.response.data && error.response.data.msg) {
    errorMessage = error.response.data.msg;
  } else if (error.message) {
    errorMessage = error.message;
  }

  return errorMessage;
};

export const loginAPI = (creds: any) => async (dispatch: Dispatch<AuthActionTypes>) => {
  // Type creds
  dispatch({ type: types.ACCOUNT_LOADING });
  try {
    console.log(creds);
    const res = await axiosInstance.post("/users/login", creds);

    dispatch({ type: types.LOGIN_SUCCESS, payload: { token: res.data.token } });
  } catch (error: any) {
    // Type error
    const errorMessage = handleAxiosError(error);
    dispatch({ type: types.ACCOUNT_ERROR, payload: { payload: errorMessage } });
    return Promise.reject(errorMessage);
  }
};

export const signupAPI = (creds: any) => async (dispatch: Dispatch<AuthActionTypes>) => {
  // Type creds
  dispatch({ type: types.ACCOUNT_LOADING });
  try {
    const res = await axiosInstance.post("/users/signup", creds);
    dispatch({ type: types.SIGNUP_SUCCESS, payload: { data: res.data.data } });
  } catch (error: any) {
    // Type error
    const errorMessage = handleAxiosError(error);
    dispatch({ type: types.ACCOUNT_ERROR, payload: { payload: errorMessage } });
    return Promise.reject(errorMessage);
  }
};

export const logoutAPI = () => async (dispatch: Dispatch<AuthActionTypes>) => {
  dispatch({ type: types.ACCOUNT_LOGOUT });
};
