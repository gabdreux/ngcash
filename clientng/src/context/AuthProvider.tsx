//resgatar as infos dos usuários e salvar no contexto.

import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";


import { useRouter } from "next/router";

export interface AuthContextType {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

//As propriedades que vão ser passadas para o authProvider
interface Props {
  children: React.ReactNode;
}

//Armazena e atualiza os dados de autenticação e cria o contexto
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

//Componente
const jQuery = require('jquery');
const $ = jQuery.default || jQuery;

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  

  // Verifica se o usuário está logado usando os dados armazenados no token
  useEffect(() => { 
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        const { id, userName, accountId, balance } = decodedToken;
        setAuth({ id, user: userName, accountId, balance });
        setIsAuthenticated(true); // Corrigido para true        
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

    // Função para efetuar logout
    const handleLogout = () => {
      setAuth({});
      setIsAuthenticated(false);
      sessionStorage.removeItem("token");
      sessionStorage.clear();
      // router.push("/");
    };

  // Componente AuthProvider é renderizado com o valor do objeto do contexto
  return (
    <AuthContext.Provider value={{
      auth,
      setAuth,
      isAuthenticated,
      login: () => {}, // Implemente essa função
      logout: handleLogout // Implemente essa função
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
