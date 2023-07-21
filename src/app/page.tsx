"use client"
import { useEffect, useState } from 'react'
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
      <header className='grid-in-header bg-purple-400 flex justify-center items-center'>
        <img src="/logo2.svg" alt='alvo logo' className='h-3/4'/>
        <h1>ALVO</h1>
      </header>
      <nav className='grid-in-nav bg-blue-400'>
        {
          username == "Acessar"
          ? (
            <div className="h-full flex justify-center items-center flex-col">
              <a className='h-[2rem] w-1/2 bg-zinc-50 text-center' href="/acessar">Acessar</a>
              <a className='h-[2rem] w-1/2 bg-zinc-50 text-center mt-1' href="/cadastrar">Cadastrar</a>
            </div>
          )
          : (
            <div className="h-full flex justify-center items-center flex-col">
              <a className='h-[2rem] w-1/2 bg-zinc-50 text-center' href={`/${username.toLowerCase()}`}>{username}</a>
              <button className='h-[2rem] w-1/2 bg-zinc-50 mt-1' onClick={handleSignOut}>Sair</button>
            </div>
          )
        }
      </nav>
      <main className='grid-in-main bg-yellow-300'>
        <ul className='h-full w-full p-10'>
          {listTargets.map((target) => {
            return (
              <li key={`${target.id}`} className='bg-slate-300 hover:bg-slate-400 shadow-lg my-1 p-2 rounded-md border-2 border-gray-500'>
                {target.title} | 
                <a href={`/${target.user.username}`} className='text-blue-700'> {target.user.username}</a>
              </li>
            )
          })}
          <li></li>
        </ul>
      </main>
    </div>
  )
}

export default Home;
