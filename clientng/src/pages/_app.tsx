import { AppProps } from 'next/app';
import BgLayout from '../../src/components/bgLayout';
import 'src/styles/styles.css';
import Menu from '@/components/menu';
import { AuthProvider } from '../context/AuthProvider';
import PersistLogin from '../components/PersistLogin';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log('Bem-vindo ao meu aplicativo!');
  }, []);

  return (
    <AuthProvider>
      <PersistLogin>
      <Menu />
      <BgLayout>
        <Component {...pageProps} />
      </BgLayout>
      </PersistLogin>
    </AuthProvider>
  );
}

export default MyApp;
