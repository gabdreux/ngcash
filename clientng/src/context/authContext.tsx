import { createContext, useContext, useEffect, useState } from 'react';

interface Account {
  balance: string;
}

interface User {
  id: number;
  userName: string;
  password: string;
  account: Account;
}

interface TokenPayload {
  id: number;
  userName: string;
  exp: number;
}


interface AuthContextData {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({  }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1])) as TokenPayload;
    const newUser: User = { id: payload.id, userName: payload.userName, password: '', account: { balance: '0' } };
    setUser(newUser);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      login(token);
    }
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}></AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
