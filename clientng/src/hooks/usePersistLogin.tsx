import { useEffect } from 'react';
import useAuth from './useAuth';

const usePersistLogin = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (!auth.user) {
      const storedUser = getCookie("user");
      const storedPwd = getCookie("pwd");
      const storedBalance = getCookie("balance");

      if (storedUser && storedPwd && storedBalance) {
        const parsedBalance = parseFloat(storedBalance);
        setAuth({ user: storedUser, pwd: storedPwd, balance: parsedBalance });
      }
    } else {
      document.cookie = `user=${auth.user}; path=/; max-age=${60 * 60 * 24 * 7}`;
      document.cookie = `pwd=${auth.pwd}; path=/; max-age=${60 * 60 * 24 * 7}`;
      document.cookie = `balance=${auth.balance}; path=/; max-age=${60 * 60 * 24 * 7}`;
    }
  }, [auth, setAuth]);

  // Função auxiliar para obter o valor do cookie pelo nome
  function getCookie(name: string): string | undefined {
    const cookie = document.cookie.split(";").find((c) => c.trim().startsWith(`${name}=`));
    if (cookie) {
      return cookie.split("=")[1];
    }
    return undefined;
  }

  return null;
};

export default usePersistLogin;
