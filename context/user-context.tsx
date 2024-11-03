"use client";
import { useState, ReactNode, createContext } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BASE_URL_MODERATOR = process.env.BASE_URL_MODERATOR;

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  date: Date;
  token: string;
}

interface UserContextType {
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
  token: string;
}

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL_MODERATOR}/user/login`, {
        email,
        password,
      });
      if (response.status === 401) {
        alert("Invalid email or password");
      }
      setLoading(false);
      setToken(response.data.token);
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      router.push("/admin");
    } catch (error) {
      alert("Invalid email or password");
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        login,
        loading,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
