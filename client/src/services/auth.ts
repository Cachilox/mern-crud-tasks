import { UserLogin, UserRegister } from "../interface";
import axios from "./axios";

export const registerRequest = async (user: UserRegister) => {
  return axios.post("/auth/register", user);
};

export const loginRequest = async (user: UserLogin) => {
  return axios.post("/auth/login", user);
};

export const verifyTokenRequest = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get("/auth/verify", config);
};

export const logoutRequest = async () => axios.post("/auth/logout")
