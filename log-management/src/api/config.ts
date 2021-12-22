import axios from 'axios';
import { Domain } from '../type'

const env: string = process.env.NODE_ENV;

const configHttp: Domain = {
  development: {
    http: 'http://localhost:3000/'
  },
  production: {
    http: 'http://localhost:4000/'
  }
}[env]

const config = {
  baseURL: configHttp.http,
  timeout: 5000,
}

export const api = axios.create(config);

// post 请求默认 headers
api.defaults.headers.post['Content-Type'] = 'application/json';

// 全局拦截器
api.interceptors.response.use(res => {
  return res
},err => {
  return Promise.reject(err)
})


