import { AppProps } from 'next/app';
import BgLayout from '../../src/components/bgLayout';
import 'src/styles/styles.css';
import Menu from '@/components/menu';
import { AuthProvider } from '../context/AuthProvider';



function MyApp({ Component, pageProps}: AppProps) {

  return (

    <div>
      <AuthProvider>
        <Menu/>
        <BgLayout>
          <Component {...pageProps}/>
        </BgLayout>
      </AuthProvider>
    </div>


  );
};


export default MyApp;
