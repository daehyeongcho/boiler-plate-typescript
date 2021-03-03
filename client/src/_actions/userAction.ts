import * as usersAPI from "../api/users";
import axios from "axios";

export const LOGIN_USER = "LOGIN_USER" as const;

export const loginUser = (dataToSubmit: usersAPI.SubmitForm) => {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};
