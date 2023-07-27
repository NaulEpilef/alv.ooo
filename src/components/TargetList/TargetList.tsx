import { ITarget, ITargetEdit, ITargetToggleComplete } from "@/interfaces/target";
import { useState } from "react";

interface ITargetListReq {
  target: ITarget;
  handleCompleteTarget: ({ id, isCompleted }: ITargetToggleComplete) => void;
  handleEditTarget: ({ event, id, isPrivate, title }: ITargetEdit) => void;
}

const TargetList = ({ target, handleCompleteTarget, handleEditTarget }: ITargetListReq) => {
  const [title, setTitle] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  return (
    <li key={target.id} className={`${target.isPrivate ? `bg-red-300 hover:bg-red-400` : `bg-slate-300 hover:bg-slate-400`} shadow-lg my-1 p-2 rounded-md border-2 border-gray-500 flex items-center`}>
      <input type="checkbox" name="isCompleted" id={target.id} checked={target.isCompleted} value={"true"} onChange={event => handleCompleteTarget({ id: target.id, isCompleted: event.target.checked })} />
      <span className="ml-2">
        {target.title} | {target.isCompleted.toString()}
      </span>
      <form onSubmit={event => handleEditTarget({ event, id: target.id, title, isPrivate })}>
        <input type="text" name='title' value={title} onChange={event => setTitle(event.target.value)}/>
        <input type="checkbox" name="isPrivate" checked={isPrivate} onChange={event => setIsPrivate(event.target.checked)} />
        { isPrivate ? <span className="bg-yellow-600">Privado</span> : <span className="bg-green-600">Publico</span> }
        <button type='submit'>Enviar</button>
      </form>
    </li>
  );
}

export default TargetList;