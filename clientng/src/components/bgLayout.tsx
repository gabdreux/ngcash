import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import useAuth from '../hooks/useAuth';
import { fetchAuthData } from '../api/auth';
import AuthContext from "../context/AuthProvider";

const BgLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';
  const isRegisterPage = router.pathname === '/register';

  const { auth, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuthData() {
      await fetchAuthData();
      setLoading(false);
    }
    loadAuthData();
  }, [setAuth]);

  const userName = auth?.userName || '';
  const balance = auth?.account?.balance || '';

  return (
    <div className="bgBox">
      <div>
        <img
          src="https://s3.amazonaws.com/appforest_uf/f1675864639870x117909144627389890/ngLogo.png"
          alt="NG Cash logo"
          width={250}
          style={{ marginBottom: '20px' }}
        />
      </div>

      <div className={isLoginPage || isRegisterPage ? 'hide' : 'greetings'}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1>OLÁ, {userName}!</h1>
            <h2>Seu saldo atual é de: {balance}.</h2>
          </>
        )}
      </div>

      {children}
    </div>
  );
};

export default BgLayout;


