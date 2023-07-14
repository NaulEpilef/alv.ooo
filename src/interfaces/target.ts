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