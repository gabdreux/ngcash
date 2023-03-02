import { AppProps } from 'next/app';
import BgLayout from '../../src/components/bgLayout';
import 'src/styles/styles.css';
import Menu from '@/components/menu';
import { AuthProvider } from '../context/AuthProvider';

import PersistLogin from "@/components/PersistLogin";
import { Outlet } from "react-router-dom";



function MyApp({ Component, pageProps}: AppProps) {

  return (

    <div>
      <AuthProvider>
        <PersistLogin>
          <Menu/>
          <BgLayout>
            <Component {...pageProps}/>
          </BgLayout>
          <Outlet />
        </PersistLogin>
      </AuthProvider>
    </div>


  );
};


export default MyApp;
