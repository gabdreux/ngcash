import { useEffect } from 'react';
import  AuthContext  from '../context/AuthProvider';

const usePersistLogin = () => {
  const { userAuth, setUserAuth } = useAuth();

  useEffect(() => {
    if (!userAuth) {
      const storedUserName = localStorage.getItem('userName');
      const storedBalance = localStorage.getItem('balance');

      if (storedUserName && storedBalance) {
        const parsedBalance = parseFloat(storedBalance);
        setUserAuth?.({ userName: storedUserName, balance: parsedBalance });
      }
    } else {
      localStorage.setItem('userName', userAuth.userName);
      localStorage.setItem('balance', userAuth.balance.toString());
    }
  }, [userAuth, setUserAuth]);

  return null;
};

export default usePersistLogin;