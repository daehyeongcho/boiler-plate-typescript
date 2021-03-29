import * as usersAPI from "../api/users";
import axios from "axios";
import { ThunkAction } from "redux-thunk";

export const LOGIN_USER = "LOGIN_USER" as const;
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS" as const;
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR" as const;

export const REGISTER_USER = "REGISTER_USER" as const;
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS" as const;
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR" as const;

export const AUTH_USER = "AUTH_USER" as const;

// export const loginUser = (dataToSubmit: usersAPI.LoginForm) => async (
//   dispatch
// ) => {
//   dispatch({ type: LOGIN_USER });
//   try {
//     const data = await usersAPI.loginUser(dataToSubmit);
//     dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
//   } catch (e) {
//     dispatch({ type: LOGIN_USER_ERROR, payload: e });
//   }
// };

export const loginUser = async (dataToSubmit: usersAPI.LoginForm) => {
  const request = await axios.post("/api/users/login", dataToSubmit);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const registerUser = async (dataToSubmit: usersAPI.RegisterForm) => {
  const request = await axios.post("/api/users/register", dataToSubmit);

  return {
    type: REGISTER_USER,
    payload: request,
  };
};

export const auth = async () => {
  const request = await axios.get("/api/users/auth");

  return {
    type: AUTH_USER,
    payload: request,
  };
};
