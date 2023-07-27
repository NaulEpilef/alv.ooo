"use client"
import { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation'

import api from "@/configs/api";

const SignUp = () => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const route = useRouter();

  const handleSignUp = (event: FormEvent) => {
    event.preventDefault();

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
    <div className="grid grid-areas-layout-no-nav grid-cols-layout-no-nav grid-rows-layout h-screen">
      <header className='grid-in-header bg-purple-400 flex justify-center items-center'>
        <img src="/logo2.svg" alt='alvo logo' className='h-3/4'/>
        <h1>ALVO</h1>
      </header>
      <main className='grid-in-main bg-yellow-300'>
        <form className="h-full flex justify-center items-center flex-col" onSubmit={handleSignUp}>
          <input className="p-2" type="text" placeholder="nome de usuário" onChange={event => setUsername(event.target.value)}/>
          <input className="p-2 mt-1" type="email" placeholder="email" onChange={event => setEmail(event.target.value)}/>
          <input className="p-2 mt-1" type="password" placeholder="senha" onChange={event => setConfirmPassword(event.target.value)}/>
          <input className="p-2 mt-1" type="password" placeholder="confirmar senha" onChange={event => setPassword(event.target.value)}/>
          <button type="submit" className="p-2 bg-lime-400 rounded-md mt-1">Entrar</button>
        </form>
      </main>
    </div>
  );
}

export default SignUp;