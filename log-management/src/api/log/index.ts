import { api } from "../config";
import { LoginForm } from '../../type'

export async function login(params: LoginForm) {
  console.log('params', params)
  const res = await api.post('api/1/login', params);
  return res;
}

// 创建项目
export async function createPro(params: LoginForm) {
  console.log('params', params)
  const res = await api.post('api/1/project', params);
  return res;
}

// 删除项目
export async function delPro(id: string) {
  console.log('params', id)
  const res = await api.post('api/1/project', {id});
  return res;
}

