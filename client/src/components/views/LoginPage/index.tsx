import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/userAction";

const LoginPage = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onSubmit(form);
    console.log("Email: ", email);
    console.log("Password: ", password);
    dispatch(loginUser(form));
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input name="email" type="email" value={email} onChange={onChange} />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
        />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
