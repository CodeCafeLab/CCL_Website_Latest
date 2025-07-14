import React, { createContext, useContext, useState, useEffect } from "react";
import { apiClient } from "@/lib/api";

type User = {
  email: string;
  name?: string;
  // Add more fields as needed
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: { name: string; email: string; password: string }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for token and fetch profile on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      apiClient.get("/auth/profile")
        .then(res => setUser(res.data))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const res = await apiClient.post("/auth/login", { email, password });
    localStorage.setItem("authToken", res.data.token);
    setUser(res.data.user);
    setLoading(false);
  };

  const register = async (data: { name: string; email: string; password: string }) => {
    setLoading(true);
    const res = await apiClient.post("/auth/register", data);
    localStorage.setItem("authToken", res.data.token);
    setUser(res.data.user);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
