import axios from "axios";

export type LoginForm = {
  email: string;
  password: string;
};

export type RegisterForm = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export async function loginUser(dataToSubmit: LoginForm) {
  const request = await axios.post("/api/users/login", dataToSubmit);
  return request.data;
}
