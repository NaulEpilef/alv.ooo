"use client"
import { useEffect, useState } from "react";
import api from "@/configs/api";
import { ITargetWithUser } from "@/interfaces/target";

const UserRoute = ({ params }: { params: { username: string } }) => {
  const [userTargets, setUserTargets] = useState<ITargetWithUser[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    api.get(`/target/${params.username}`, { headers }).then((data) => {
      setUserTargets(data.data);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  const handleCompleteTarget = (isCompleted: string) => {
    console.log(isCompleted)
  }

  return (
    <>
      <div className="grid grid-areas-layout grid-cols-layout grid-rows-layout h-screen">
        <header className='grid-in-header bg-purple-400 flex justify-center items-center'>
          <img src="/logo2.svg" alt='alvo logo' className='h-3/4'/>
          <h1>ALVO</h1>
        </header>
        <nav className='grid-in-nav bg-blue-400'>
          <div className="h-full flex justify-center items-center flex-col">
            <a className='h-[2rem] w-1/2 bg-zinc-50 text-center' href={`/${params.username.toLowerCase()}`}>{params.username}</a>
            {/* <button className='h-[2rem] w-1/2 bg-zinc-50 mt-1' onClick={handleSignOut}>Sair</button> */}
          </div>
        </nav>
        <main className='grid-in-main bg-yellow-300'>
          <ul className='h-full w-full p-10'>
            {userTargets.length > 0 && userTargets.map(target => {
              return (
                <li key={target.id} className={`${target.isPrivate ? `bg-red-300 hover:bg-red-400` : `bg-slate-300 hover:bg-slate-400`} shadow-lg my-1 p-2 rounded-md border-2 border-gray-500 flex items-center`}>
                  <input type="checkbox" name="isCompleted" id={target.id} checked={target.isCompleted} onChange={event => handleCompleteTarget(event.target.value)} />
                  <span className="ml-2">
                    {target.title} | {target.isCompleted.toString()}
                  </span>
                </li>
              )
            })}
            <li></li>
          </ul>
        </main>
      </div>
    </>
  );
}

export default UserRoute