"use client"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

import api from "@/configs/api";

const SignIn = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const route = useRouter();

  const handleSignIn = () => {
    const data = {
      email,
      password
    };

    api.post("/signin", data).then(res => {
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      route.push("/");
    }).catch(err => {
      console.error(err);
    });
  }

  useEffect(() => {

  }, []);

  return (
    <>
      <input className="bg-orange-700" type="email" placeholder="email" onChange={event => setEmail(event.target.value)}/>
      <input className="bg-orange-700" type="password" placeholder="senha" onChange={event => setPassword(event.target.value)}/>
      <button type="button" onClick={handleSignIn}>Entrar</button>
    </>
  );
}

export default SignIn;