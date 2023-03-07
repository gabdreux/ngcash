import { usePathname } from 'next/navigation';
import { ActiveLinkProps } from './activeLink';
import { useRouter } from 'next/router';
  



const BgLayout = ({children}:{children:React.ReactNode}) => {
   
    const router = useRouter();
    const isLoginPage = router.pathname === '/login';
    const isRegisterPage = router.pathname === '/register';

    return (


             <div className="bgBox">


                <div>
                    <img
                        src="https://s3.amazonaws.com/appforest_uf/f1675864639870x117909144627389890/ngLogo.png"
                        alt="NG Cash logo"
                        width={160}
                    />
                </div>


                <div className={isLoginPage  || isRegisterPage ?"hide" : "greetings"}>
                    <h2>
                        OLÁ, _userName!
                    </h2>
                    <h4>
                        Seu saldo atual é de: _Saldo.
                    </h4>
                </div>


                {children}
                
            </div>
    )

}




export default BgLayout;

