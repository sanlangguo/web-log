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