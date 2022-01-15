// 登录
export interface LoginForm {
  pass: string | number,
  number: string | number,
}

export interface Domain {
  [key: string]: string
}

export interface NavPath {
  path: string,
  name: string,
}

export interface CreatePro {
  name: string,
  type: string
}

export interface ProList {
  id: number,
  name: string
}

export interface LogListParams {
  id: number,
  size: number,
  count: number,
  starTime?: number,
  endTime?: number,
  type?: string
}

export interface Page {
  size: number,
  count: number,
}