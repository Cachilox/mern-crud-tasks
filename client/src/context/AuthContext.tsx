import React, { createContext, useState } from "react";
import { registerRequest } from "../services/auth";
import { User } from "../interface/types";


interface AuthContextInterface {
  signup: (user: User) => void;
  user: User | null;
  isAuthenticated: boolean | null;
  errors: string[];
}

export const AuthContext = createContext<AuthContextInterface>({
  signup: () => {},
  user: null,
  isAuthenticated: null,
  errors: [],
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const signup = async (user: User) => {
    try {
      const res = await registerRequest(user);
      console.log(res);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error: any) {
      setErrors(error.response.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
