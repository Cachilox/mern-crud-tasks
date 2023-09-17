export interface UserRegister {
  username: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface Task {
  _id?: string;
  title: string;
  description: string;
  date?: number
}
