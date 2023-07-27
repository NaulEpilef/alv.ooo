import { FormEvent } from "react";
import { IUserOnTarget } from "./user";

export interface ITarget {
  id: string;
  userId: string;
  title: string;
  isCompleted: boolean;
  isPrivate: boolean;
}

export interface ITargetWithUser {
  id: string;
  title: string;
  userId: string;
  isCompleted: boolean;
  isPrivate: boolean;
  user: IUserOnTarget  
}

export interface ITargetEdit {
  id: string;
  event: FormEvent;
  title: string;
  isPrivate: boolean;
}

export interface ITargetToggleComplete {
  id: string;
  isCompleted: boolean;
}