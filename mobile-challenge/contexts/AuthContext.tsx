// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface AuthContextProps {
  user: any;
  signIn: (user: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (user: string, password: string) => {
    try {
      const response = await axios.post(
        "https://test-api-y04b.onrender.com/signIn",
        { user, password }
      );
      const userData = response.data;
      await AsyncStorage.setItem("@user", JSON.stringify(userData));
      setUser(userData);
    } catch (error : any) {
      alert("Login failed: " + error.response.data.message);
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("@user");
    setUser(null);
  };

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("@user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };