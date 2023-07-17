import s from "./styles.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authThunks } from "../auth.slice";
import { useActions } from "../../../common/hooks";
import React from 'react'

export const Login = () => {
  const { login } = useActions(authThunks);
  const navigate = useNavigate();

  const loginHandler = () => {
    const payload = {
      email: "safrondev1@gmail.com",
      password: "1qazxcvBG",
      rememberMe: false,
    };
    login(payload)
      .unwrap()
      .then((res:any) => {
        toast.success("Вы успешно залогинились");
        navigate("/packs");
      })
      .catch((err:any) => {
        toast.error(err.e.response.data.error);
      });
  };

  return (
    <div className={s.container}>
      <h1>Login</h1>
      <button onClick={loginHandler}>login</button>
    </div>
  );
};
