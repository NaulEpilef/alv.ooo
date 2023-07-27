"use client"
import { FormEvent, useEffect, useState } from "react";
import api from "@/configs/api";
import { ITargetEdit, ITargetToggleComplete, ITargetWithUser } from "@/interfaces/target";
import TargetList from "@/components/TargetList/TargetList";

const Profile = ({ params }: { params: { username: string } }) => {
  const [userTargets, setUserTargets] = useState<ITargetWithUser[]>([]);

  const [title, setTitle] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  useEffect(() => {
    listAllTargets();
  }, []);

  const listAllTargets = () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };
    api.get(`/target/${params.username}`, { headers }).then((data) => {
      setUserTargets(data.data);
    }).catch((err) => {
      console.error(err);
    });
  }

  const handleCompleteTarget = ({ id, isCompleted }: ITargetToggleComplete) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const data = {
      targetId: id,
      isCompleted
    }

    api.put(`/target/toggle`, data, { headers }).then((data) => {
      listAllTargets();
    }).catch((err) => {
      console.error(err);
    });
  }

  const handleCreateTarget = (event: FormEvent) => {
    event.preventDefault();
    
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const data = {
      title,
      isPrivate
    }

    api.post(`/target/create`, data, { headers }).then((data) => {
      listAllTargets();
      setTitle("");
      setIsPrivate(false);
    }).catch((err) => {
      console.error(err);
    });
  }

  const handleEditTarget = ({event, id, isPrivate, title}: ITargetEdit) => {
    event.preventDefault();
    
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const data = {
      targetId: id,
      title,
      isPrivate
    }

    api.put(`/target/edit`, data, { headers }).then((data) => {
      listAllTargets();
    }).catch((err) => {
      console.error(err);
    });
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
          </div>
        </nav>
        <main className='grid-in-main bg-yellow-300'>
          <ul className='h-full w-full p-10'>
            {userTargets.length > 0 && userTargets.map(target => {
              return (
                <TargetList key={target.id} target={target} handleCompleteTarget={handleCompleteTarget} handleEditTarget={handleEditTarget}/>
              )
            })}
            <br />
            <br />
            <li className={`bg-slate-300 hover:bg-slate-400 shadow-lg my-1 p-2 rounded-md border-2 border-gray-500 flex items-center`}>
              <form onSubmit={handleCreateTarget}>
                <input type="text" name='title' value={title} onChange={event => setTitle(event.target.value)}/>
                <input type="checkbox" name="isPrivate" checked={isPrivate} onChange={event => setIsPrivate(event.target.checked)} />
                { isPrivate ? <span className="bg-yellow-600">Privado</span> : <span className="bg-green-600">Publico</span> }
                <button type='submit'>Enviar</button>
              </form>
            </li>
          </ul>
        </main>
      </div>
    </>
  );
}

export default Profile