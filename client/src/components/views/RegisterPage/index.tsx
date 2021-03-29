import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/userAction";

const RegisterPage = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const { email, name, password, confirmPassword } = form;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    dispatch(registerUser(form)).then((res) => {
      if (res.payload.data.success) {
        props.history.push("/login");
      } else {
        console.log(res);
        alert("회원가입에 실패했습니다");
      }
    });
    props.history.push("/login");
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
        <label>Name</label>
        <input name="name" type="text" value={name} onChange={onChange} />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
        />
        <label>Confirm Password</label>
        <input
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={onChange}
        />
        <br />
        <button>회원 가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;
