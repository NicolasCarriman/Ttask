import { IUser } from "./user.model";

export enum TimeInterval {
  "Once",
  "Twice",
  "Thirce",
  "Four Times",
  "Five Times",
  "Sis Times",
  "Seven Times",
  "Eight Times",
  "Nine Times",
  "Ten Times",
  "Eleven Times",
  "Twelve Times",
}

export enum EveryInterval {
  "4 hours",
  "Day",
  "Week",
  "Month",
  "Quarter",
  "Year",
}

export interface ITimeSettings {
  from: string;
  to: string;
}

export interface IAutomaticTimeSettings extends ITimeSettings {
  times: TimeInterval,
  every: EveryInterval
}

export enum Role {
   "Admin",
   "Editor",
   "Viewer",
   "Validator",
}

type RoleNames = keyof typeof Role;
interface IPermissionsBase {
  create: boolean;
  edit: boolean;
  delete: boolean;
  verify: boolean;
}

export type Permissions = Record<RoleNames, IPermissionsBase>;

export interface IUserConfig {
  user: IUser,
  permission: Role
}

type TaskInputTypes = HTMLInputElement['type'];

enum TypeField {
  'output',
  'input'
}

type Field = {
  label: string;
  type: TaskInputTypes,
  value: string | boolean | number,
  href?: string,
  isRequired: boolean,
  attachments?: string[];
  typeId: TypeField;
};

type ConcreteField = Field & { id: number | string }

type Metric = { label: string, id: string | number, unity: number}
type ListItem = {
  label: string,
  id: number | string,
  value?: string | boolean | number | null
}

type Expected = { checked: boolean }
type ExpectedMetric = { value: number | string } & Metric['id'] & Expected;

interface IValidation {
  users: (IUserConfig & { fieldsId: ConcreteField['id'][] })[];
  expectedMetrics: ExpectedMetric[];
  expectedField?: Pick<ConcreteField , 'id' | 'value'> & Expected;
  expectedList?: (Required<ListItem> & Expected )[];
  step?: { id: number } & Expected
}

export interface IAutomaticValidation extends Omit<IValidation, 'users'> {
  action: any;
}

enum Actions {
  'increase',
  'decrease',
  'optimize',
  'generate report'
}

enum Targets {
  'location',
  'demography',
  'product preference'
}

export interface IGoalSettings {
  target: Omit<ListItem, 'label'> & { label: keyof typeof Targets }[],
  list?: ListItem[];
  Metrics: Metric[];
}

export interface IAutomaticGoalSettings extends IGoalSettings {
  action: Actions;
}
