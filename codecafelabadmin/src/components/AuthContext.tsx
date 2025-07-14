"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/axios";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage for auth state
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(auth === "true");
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await apiClient.post("/auth/login", {
        email,
        password,
      });
      const { token, user } = res.data;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
      setIsAuthenticated(false);
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    router.push("/login");
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await apiClient.post("/auth/register", {
        name,
        email,
        password,
      });
      await login(email, password);
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
