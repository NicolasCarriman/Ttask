import { taskId } from './task.model';
export type userId = string;

export interface IConcreteUser {
  name: string;
  id: userId;
  departament: string;
  tasks: taskId[];
}

export type IUser = Pick<IConcreteUser, 'name' | 'id'>;
