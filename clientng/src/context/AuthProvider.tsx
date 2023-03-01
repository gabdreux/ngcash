import React, { createContext, useState } from 'react';

interface AuthContextType {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
}

//Armazena e atualiza os dados de autenticação e cria o contexto
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

//As propriedades que vão ser passadas para o authProvider
interface Props {
  children: React.ReactNode;
}

//Cria e atualiza estado do Auth
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState({});

  //Componente AUthProvider é renderizado com o valor do objeto do contexto
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
