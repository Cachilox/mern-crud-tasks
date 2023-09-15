import { User } from "../interface/types";
import axios from 'axios'
const API = import.meta.env.VITE_API_URL;

export const registerRequest = async (user: User) => {
  return axios.post(`${API}/register`, user)
};
