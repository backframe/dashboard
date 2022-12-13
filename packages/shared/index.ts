export interface ICreateAdmin {
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ILoginAdmin {
  email: string;
  password: string;
}

export interface ICreateAdminRes {
  status: ResStatus;
  msg: string;
  token: string;
  user: {
    id?: string;
    email: string;
    name?: string;
  };
}

export enum ResStatus {
  "SUCCESS",
  "ERROR",
}
