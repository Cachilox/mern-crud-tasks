import { createContext, useState, useEffect } from "react";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyTokenRequest,
} from "../services/auth";
import { UserRegister, UserLogin } from "../interface";
import Cookies from "js-cookie";
import axios from "axios";

interface AuthContextInterface {
  signup: (user: UserRegister) => void;
  user: UserRegister | null;
  isAuthenticated: boolean | null;
  errors: string[];
  signin: (user: UserLogin) => void;
  isLoading: boolean | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  signup: () => {},
  user: null,
  isAuthenticated: null,
  errors: [],
  signin: () => {},
  isLoading: null,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const signup = async (user: UserRegister) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200 || res.status === 201) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const err = (errorMessage = error.response?.data || errorMessage);
        setErrors(err);
      }
      throw errorMessage;
    }
  };

  const signin = async (user: UserLogin) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const err = (errorMessage = error.response?.data || errorMessage);
        setErrors(err);
      }
      throw errorMessage;
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      Cookies.remove("token");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      let errorMessage = "An error occurred";
      if (axios.isAxiosError(error)) {
        const err = (errorMessage = error.response?.data || errorMessage);
        setErrors(err);
      }
      throw errorMessage;
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setIsLoading(false);
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        errors,
        signin,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
