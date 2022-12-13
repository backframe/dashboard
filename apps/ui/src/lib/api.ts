import { AdminUtils } from "@backframe/admin-utils";
import { ICreateAdmin, ILoginAdmin } from "shared";

const base = import.meta.env.BF_BACKEND_URL;

export const api = new AdminUtils(base);

// Abstract out these function calls since react-query will change the `this` ctx
export const createAdminUser = async (args: ICreateAdmin) =>
  await api.createAdminUser(args);

export const loginAdminUser = async (args: ILoginAdmin) =>
  await api.loginAdminUser(args);
