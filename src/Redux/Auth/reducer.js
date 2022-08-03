import { getData, removeData, saveData } from "../../Utils/localStorage";
import * as types from "./actionTypes";

const initState = {
  isAuth: getData("isAuth") || false,
  token: getData("token") || "",
  isLoading: false,
  isError: false,
};

export const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.SIGNUP_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.SIGNUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case types.SIGNUP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case types.SIGNIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.SIGNIN_SUCCESS: {
      saveData("isAuth", true);
      saveData("token", payload);
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload,
      };
    }
    case types.SIGNIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        token: "",
        isError: true,
      };
    }
    case types.LOGOUT: {
      removeData("isAuth")
      removeData("token")
      return {
        ...state,
        isAuth: false,
        token: "",
      };
    }
    default: {
      return state;
    }
  }
};
