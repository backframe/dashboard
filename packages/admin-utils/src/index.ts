import axios, { AxiosInstance } from "axios";
import { ICreateAdmin, ICreateAdminRes, ILoginAdmin } from "shared";

export class AdminUtils {
  #client: AxiosInstance;

  // during dev the server will be on a different url
  constructor(url?: string) {
    this.#client = axios.create({
      baseURL: url ? `${url}/_/` : "/_/",
    });
  }

  async createAdminUser({ email, password, passwordConfirm }: ICreateAdmin) {
    const data = await this.#client.post<ICreateAdminRes>("api/admins/create", {
      email,
      password,
      passwordConfirm,
    });

    return data;
  }

  async loginAdminUser({ email, password }: ILoginAdmin) {
    const data = await this.#client.post<ICreateAdminRes>(
      "api/admins/email-auth",
      {
        email,
        password,
      }
    );
    return data;
  }
}
