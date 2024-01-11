import { ITeam } from "./team.model";
import { userId } from "./user.model";

export type statusType = 'done' | 'stuck' | 'inProgress';
export type priorityType = 'high' | 'low' | 'none' | 'medium';
export type taskId = string;

export type subtaskItem = {
  item: string;
  done: boolean;
  id: string;
}

export type subtask = {
  name: string;
  id: string;
  items: subtaskItem[]
}

export interface ITask {
  taskName: string
  taskDate: string
  taskDescription?: string
  taskCategory: string
  taskUsersId: userId[]
  taskPriority: priorityType
  taskStatus: statusType
  taskId: taskId
  subtasks?: subtask[]
}

interface ITarget {
  parameters: string[];
  name: string;
  id: number;
  tracker: string; // must be date or timestamp
}

type Frecuency = {
  duration: number;
  timestamp: number;
}

interface AutomatizationBase {
  id: string;
  active: boolean;
  frecuency: Frecuency;
  target: string[];
  exeptions: string[];
}

interface iAutomatizationBheavior {
  segment: string[]; //segmentar equipos o personas
  getReport: () => void,
  getDuration: string[],
  getErrors: () => void,
  getNotErrors: () => void
}

type AutomatizationEvent = AutomatizationBase & {
  type: 'event',
  condition: string,
  action: string,
  initialization: () => void,
}

type automatizationReport = AutomatizationBase & {
  metrics: string[];
  source: string[]; //api or provided Data
  output?: string; //pdft jxl
  destination: string[];
  access: string[];//users access
}

interface TaskSettings {
  steps: number;
  validation: boolean;
  automatizations: (AutomatizationEvent | automatizationReport)[];
}

interface Statics {
  issues: number;
  time: number;
}

interface TaskData {
  target: string;
  stats: Statics;
}

export interface ITask2 {
  taskSettings: TaskSettings;
  taskData: TaskData;
}

interface RequerimentTypes {
  maxElements: number,
  endDate: Date,
}

export interface TaskList {
  targetValue: number;
  host?: string;
  permissions?: string[];
  team?: ITeam['id'];
  name: string;
  fields: (Fields | FieldsTracker )[];
  metadata: Record<string, string[]>
  relatedLists?: RelatedList[];
  template?: string[];
  requirements?: Partial<RequerimentTypes>[]; //ids
  automatization?: AutomatizationBase;
  isqueue?: boolean;
}

export interface TaskQueue extends Omit<TaskList, "isqueue"> {
  isqueue: true;
  steps: string | number [];
  step: string | number;
  exec: () => void;
}

type RelatedList = {
  listName: string;
  relationType: string;
}

type Fields = Record<string, string | boolean> & {
  href?: string,
  team?: ITeam['id'],
  isRequired: boolean,
  type: string,
  value: string | boolean | number,
  attachments?: string[];
};

type HistoryType = {
  timeStamp: Date,
  value: string | boolean | number;
}

type ChangesList = {
  currentTime: Date,
  history: HistoryType[];
}

type FieldsTracker = Record<string, {
  isChanged: boolean,
  status?: string,
  changes: ChangesList,
  isValidated?: boolean,
} & Fields>

//probar crear lista de tarea mutable, cuando ocurra un evento ejemplo se alcanzo a cierto tipo de ventas de producto, disparar un evento ej: campañas de marketing