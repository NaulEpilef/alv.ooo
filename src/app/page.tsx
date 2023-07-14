"use client"
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';

import { IUser } from '@/interfaces/user'
import { ITargetWithUser } from '@/interfaces/target';
import api from '@/configs/api';

const Home = () => {
  const [listTargets, setListTargets] = useState<ITargetWithUser[]>([]);
  const [username, setUsername] = useState<string>(
    localStorage.getItem("token") != null
    ? jwtDecode<IUser>(localStorage.getItem("token") as string).username
    : "Acessar"
  );

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
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
      </ul>
    </main>
  )
}

export default Home;
