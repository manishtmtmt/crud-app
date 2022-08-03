import * as types from "./actionTypes";
import axios from "axios";
import { removeData } from "../../Utils/localStorage";

export const register = (payload) => (dispatch) => {
  dispatch({ type: types.SIGNUP_REQUEST });
  return axios
    .post("https://masai-api-mocker.herokuapp.com/auth/register", payload)
    .then((r) => {
      dispatch({ type: types.SIGNUP_SUCCESS, payload: r.data });
      return types.SIGNUP_SUCCESS;
    })
    .catch((e) => {
      dispatch({ type: types.SIGNUP_FAILURE, payload: e });
      return types.SIGNUP_FAILURE;
    });
};

export const login = (params) => (dispatch) => {
  dispatch({ type: types.SIGNIN_REQUEST });
  return axios
    .post("https://masai-api-mocker.herokuapp.com/auth/login", params)
    .then((r) => {
      dispatch({ type: types.SIGNIN_SUCCESS, payload: r.data.token });
      return { type: types.SIGNIN_SUCCESS, payload: r.data.token };
    })
    .catch((e) => {
      dispatch({ type: types.SIGNIN_FAILURE, payload: e });
      return types.SIGNIN_FAILURE;
    });
};

export const getUser = (payload, user) => (dispatch) => {
  dispatch({ type: types.GET_USER_REQUEST });
  return axios
    .get(`https://masai-api-mocker.herokuapp.com/user/${user}`, {
      headers: { Authorization: `Bearer ${payload}` },
    })
    .then((r) => dispatch({ type: types.GET_USER_SUCCESS, payload: r.data }))
    .catch((e) => dispatch({ type: types.GET_USER_FAILURE, payload: e }));
};

export const logout = () => (dispatch) => {
  removeData("user");
  dispatch({ type: types.LOGOUT });
};
