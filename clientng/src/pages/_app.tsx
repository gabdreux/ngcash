import { AppProps } from 'next/app';
import BgLayout from '../../src/components/bgLayout';
import 'src/styles/styles.css';
import Menu from '@/components/menu';





function MyApp({ Component, pageProps}: AppProps) {

  return (

    <div>
      <Menu/>
      <BgLayout>
        <Component {...pageProps}/>
      </BgLayout>
    </div>


  );
}


export default MyApp;
