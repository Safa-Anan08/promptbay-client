"use client";

import {
  createContext,useContext,useEffect,useState,
} from "react";
import axiosInstance from "@/lib/axios";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const loadUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me", {
      withCredentials: true,
    });

    setUser(res.data.user);

  } catch (err) {
    console.log("AUTH ERROR:", err?.response?.data);

    setUser(null);

  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider

      value={{
        user,
       setUser,
        loading,
        fetchUser: loadUser,
        reload: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);