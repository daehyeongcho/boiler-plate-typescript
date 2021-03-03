import axios from "axios";

export type SubmitForm = {
  email: string;
  password: string;
};

export async function loginUser(dataToSubmit: SubmitForm) {
  const request = await axios.post("/api/users/login", dataToSubmit);
  return request.data;
}
