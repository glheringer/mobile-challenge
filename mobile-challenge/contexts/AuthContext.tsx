import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface AuthContextProps {
  user: any;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "https://test-api-y04b.onrender.com/signIn",
        { user: username, password }
      );
      const userData = response.data.user;
      await AsyncStorage.setItem("@user", JSON.stringify(userData));
      setUser(userData);

      // Log para verificar os dados do usuário
      console.log("User data:", userData);
    } catch (error: any) {
      // Log para verificar o erro
      console.error("Login error:", error);

      // Verifique se há uma mensagem de erro específica
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert("Login failed: " + error.response.data.message);
      } else {
        alert("Login failed: " + error.message);
      }
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
