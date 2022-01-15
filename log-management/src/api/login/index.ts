import { api } from "../config";
import { CreatePro } from '../../type'

export async function login(params: CreatePro) {
  const res = await api.post('api/1/login', params);
  return res;
}
