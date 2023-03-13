import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import useAuth from '../hooks/useAuth';
import { fetchAuthData } from '../api/auth';
import AuthContext from "../context/AuthProvider";


const BgLayout = ({ children }: { children: React.ReactNode }) => {
  
  const router = useRouter();
  const { auth, setAuth } = useContext(AuthContext);
  const { isAuthenticated } = useContext(AuthContext);
  console.log("autenticado? bg", isAuthenticated); 


  useEffect(() => {
    async function loadAuthData() {
      await fetchAuthData();
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


    <div className="greetings">
      {isAuthenticated ? (
        <>
          <h1>Bem-vindo, {userName}!</h1>
          <h2>Seu saldo atual é de: {balance}.</h2>
        </>
      ) : (
        <>
          <h1>BEM-VINDO!</h1>
        </>
      )}
    </div>
      {children}
    </div>
  );
};

export default BgLayout;


