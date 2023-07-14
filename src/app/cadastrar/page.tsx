"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation'

import api from "@/configs/api";

const SignUp = () => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const route = useRouter();

  const handleSignUp = () => {
    const data = {
      username,
      email,
      password,
      confirmPassword,
    };

    api.post("/signup", data).then(res => {
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      route.push("/");
    }).catch(err => {
      console.error(err);
    });
  }

  return (
    <>
      <input className="bg-orange-700" type="text" placeholder="nome de usuário" onChange={event => setUsername(event.target.value)}/>
      <input className="bg-orange-700" type="email" placeholder="email" onChange={event => setEmail(event.target.value)}/>
      <input className="bg-orange-700" type="password" placeholder="senha" onChange={event => setConfirmPassword(event.target.value)}/>
      <input className="bg-orange-700" type="password" placeholder="confirmar senha" onChange={event => setPassword(event.target.value)}/>
      <button type="button" onClick={handleSignUp}>Entrar</button>
    </>
  );
}

export default SignUp;