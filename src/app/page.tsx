"use client"
import { useEffect, useState } from 'react'
import Image from 'next/image';
// import logo from "@/../public/logo.svg";
import logo from "@/components/svgs/logo.svg";
import jwtDecode from 'jwt-decode';

import { IUser } from '@/interfaces/user'
import { ITargetWithUser } from '@/interfaces/target';
import api from '@/configs/api';

const Home = () => {
  const [listTargets, setListTargets] = useState<ITargetWithUser[]>([]);
  const [username, setUsername] = useState<string>("Acessar");

  const getUsername = () => {
    const token = localStorage.getItem("token");
    setUsername(token != null ? jwtDecode<IUser>(token as string).username : "Acessar");
  }

  const handleSignOut = () => {
    localStorage.removeItem("token");
    getUsername();
  }

  useEffect(() => {
    getUsername();
    api.get("/target/listAll").then(res => {
      setListTargets(res.data);
    }).catch(err => {
      console.error(err);
    });
  }, []);

  {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"> */}
  return (
    <div className="grid grid-areas-layout grid-cols-layout grid-rows-layout h-screen">
      <header className='grid-in-header bg-purple-400 select-none'>
        {/* <Image src="/logo.svg" alt='alvo logo' width={100} height={100} className='pointer-events-none'/> */}
        HEADER
      </header>
      <nav className='grid-in-nav bg-blue-400'>NAV</nav>
      <main className='grid-in-main bg-yellow-300'>MAIN</main>
      {/* {
        username == "Acessar"
        ? (
          <>
            <a className='bg-gradient-to-r from-blue-400 to-green-600' href="/acessar">Acessar</a>
            <br />
            <br />
            <a className='bg-gradient-to-r from-blue-400 to-green-600' href="/cadastrar">Cadastrar</a>
          </>
        )
        : <a className='bg-gradient-to-r from-blue-400 to-green-600' href={`/${username.toLowerCase()}`}>{username}</a>
      }
      <br />
      <br />
      <br />
      <button onClick={handleSignOut}>Sair/Deslogar/Desconectar/Abandonar/Sair da conta/Deixar conta</button>
      <br />
      <br />
      <br />
      <ul>
        {listTargets.map((target) => {
          return (
            <li key={`${target.id}`}>
              {target.title} | 
              <a href={`/${target.user.username}`}>{target.user.username}</a>
            </li>
          )
        })}
        <li></li>
      </ul> */}
    </div>
  )
}

export default Home;
