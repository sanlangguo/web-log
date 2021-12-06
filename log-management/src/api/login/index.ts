import { api } from "../config";
import { LoginForm } from '../../type'

export async function login(params: LoginForm) {
  console.log(params, api)
  const res = await api.post('login', params);
  return res;
}
