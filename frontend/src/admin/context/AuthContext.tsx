import React, { createContext, useContext, useState, useEffect } from "react";

import { isTokenExpired, handleSessionExpired } from "../../api/client";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "owner" | string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const validateAuth = () => {
      try {
        const storedToken = localStorage.getItem("juice_time_token");
        const storedUser = localStorage.getItem("juice_time_user");

        if (storedToken && storedUser) {
          if (isTokenExpired(storedToken)) {
            handleSessionExpired();
            setToken(null);
            setUser(null);
          } else {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
          }
        } else {
          setToken(null);
          setUser(null);
        }
      } catch (err) {
        console.error("Error reading auth state from localStorage:", err);
        handleSessionExpired();
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
    window.addEventListener("focus", validateAuth);
    return () => window.removeEventListener("focus", validateAuth);
  }, []);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("juice_time_token", newToken);
    localStorage.setItem("juice_time_user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("juice_time_token");
    localStorage.removeItem("juice_time_user");
    setToken(null);
    setUser(null);
    window.location.href = "/admin/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
