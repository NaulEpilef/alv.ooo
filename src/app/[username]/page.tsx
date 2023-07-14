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
  return (
    <>
      <h1>{params.username}</h1>
      <ul>
        {userTargets.length > 0 && userTargets.map(target => {
          return (
            <li key={target.id}>{target.isPrivate.toString()} | {target.title}</li>
          )
        })}
      </ul>
    </>
  );
}

export default UserRoute