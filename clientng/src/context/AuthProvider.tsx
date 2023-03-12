// import React, { createContext, useState, useEffect } from 'react';
// import jwt_decode from "jwt-decode";

// export interface AuthContextType {
//   auth: any;
//   setAuth: React.Dispatch<React.SetStateAction<any>>;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => void;
//   logout: () => void;
// }

// //As propriedades que vão ser passadas para o authProvider
// interface Props {
//   children: React.ReactNode;
// }

// //Armazena e atualiza os dados de autenticação e cria o contexto
// export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// //Componente
// const jQuery = require('jquery');
// const $ = jQuery.default || jQuery;

// export const AuthProvider: React.FC<Props> = ({ children }) => {
//   const [auth, setAuth] = useState({});
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Verifica se o usuário está logado usando os dados armazenados no token
//   useEffect(() => { 
//     const token = getCookie("token");
//     if (token) {
//       try {
//         const decodedToken: any = jwt_decode(token);
//         const { id, userName, accountId, balance } = decodedToken;
//         setAuth({ id, user: userName, accountId, balance });
//         setIsAuthenticated(true); // Corrigido para true
        
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   }, []);

//   // Função auxiliar para obter o valor do cookie pelo nome
//   function getCookie(name: string): string | undefined {
//     const cookie = document.cookie.split(";").find((c) => c.trim().startsWith(`${name}=`));
//     if (cookie) {
//       return cookie.split("=")[1];
//     }
//     return undefined;
//   }

//   // Componente AuthProvider é renderizado com o valor do objeto do contexto
//   return (
//     <AuthContext.Provider value={{
//       auth,
//       setAuth,
//       isAuthenticated,
//       login: () => {}, // Implemente essa função
//       logout: () => {} // Implemente essa função
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


import React, { createContext, useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";

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

  // Componente AuthProvider é renderizado com o valor do objeto do contexto
  return (
    <AuthContext.Provider value={{
      auth,
      setAuth,
      isAuthenticated,
      login: () => {}, // Implemente essa função
      logout: () => {} // Implemente essa função
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

