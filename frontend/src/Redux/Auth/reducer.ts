import { clearLocalStorage, getLocalStorageItem, setLocalStorageItem } from "../../utils/localStorage";
import * as types from "./actionType";

// Define the AuthState type
interface AuthState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  successMessage: string;
  signupStatus: boolean;
  auth: string;
  token: string;
}

const initData: AuthState = {
  isLoading: false,
  isError: false,
  errorMessage: "",
  successMessage: "",
  signupStatus: false,
  auth: getLocalStorageItem("accessToken") || "",
  token: getLocalStorageItem("accessToken") || "",
};

// Define action payload types (if needed)
interface LoginSuccessPayload {
  payload: string; // Token
}

interface SignupSuccessPayload {
  // Define the structure of the data returned on signup
  // For example:
  payload: any; // Replace 'any' with the actual type
}

interface CheckBalanceSuccessPayload {
  payload: { amount: number; msg: string };
}

interface ErrorPayload {
  payload: string;
}

// Define action types (important for type safety)
type AuthAction =
  | { type: typeof types.ACCOUNT_LOADING }
  | { type: typeof types.ACCOUNT_ERROR; payload: ErrorPayload }
  | { type: typeof types.LOGIN_SUCCESS; payload: LoginSuccessPayload }
  | { type: typeof types.SIGNUP_SUCCESS; payload: SignupSuccessPayload }
  | { type: typeof types.ACCOUNT_LOGOUT }
  | { type: typeof types.CHECKBALANCE_REQUEST }
  | { type: typeof types.CHECKBALANCE_SUCCESS; payload: CheckBalanceSuccessPayload }
  | { type: typeof types.CHECKBALANCE_FAILED; payload: ErrorPayload }
  | { type: any }; // Add a type for any other actions if needed

export const authReducer = (state: AuthState = initData, action: AuthAction): AuthState => {
  switch (action.type) {
    case types.ACCOUNT_LOADING:
      return { ...state, isLoading: true };

    case types.ACCOUNT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        signupStatus: false,
        errorMessage: action.payload.payload, // Access payload correctly
      };

    case types.LOGIN_SUCCESS:
      setLocalStorageItem("accessToken", action.payload.token);
      return { ...state, isLoading: false, token: action.payload.token, auth: action.payload.token }; // Update auth as well

    case types.SIGNUP_SUCCESS:
      return { ...state, isLoading: false, signupStatus: true /* ... other signup related state updates */ };

    case types.ACCOUNT_LOGOUT:
      clearLocalStorage();
      return { ...state, isLoading: false, token: "", auth: "" };

    default:
      return state;
  }
};
