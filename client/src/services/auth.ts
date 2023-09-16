import { UserLogin, UserRegister } from "../interface";
import axios from "./axios";

export const registerRequest = (user: UserRegister) => {
  return axios.post("/auth/register", user);
};

export const loginRequest = (user: UserLogin) => {
  return axios.post("/auth/login", user);
};

export const verifyTokenRequest = (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  return axios.get("/auth/verify", config);
};
