  import { useRef, useState, useEffect, useContext } from 'react';
  import AuthContext from '../context/AuthProvider';
  import axios from '../api/axios';
  import ActiveLink from "./activeLink";


  const getToken = () => sessionStorage.getItem('token');

  const LoginLayout = () => {

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef<HTMLInputElement>(null);
    const errRef: any = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState(getToken());

    useEffect(() => {
      
      if (userRef.current != null) {
        userRef.current.focus();
      };


      const token = getToken();
      if (token) {
        setSuccess(true);
      }
    }, []);

    const handleSubmit = async (e:any) => {
      e.preventDefault();
    
      const userObj = {
        userName: user,
        // userPwd: pwd,
      };
  
      try {
        const response = await axios.post('/api/login', { user, pwd }, { withCredentials: true });
        const { data } = response;

        setSuccess(true);        
        sessionStorage.setItem("user", JSON.stringify(userObj));

        // Obter o token da resposta da API
        const token = data.token;

        // Armazenar o token no sessionStorage
        sessionStorage.setItem("token", token);

      } catch (e) {
        console.log((e as Error).message);
        setErrMsg('Usuário não encontrado ou inválido')
      } 
    };


    const handleLogout = () => {
      sessionStorage.removeItem('token');
      setToken(null);
      setSuccess(false);
    };
  
    const headers = { Authorization: `Bearer ${token}` };
 

  return (
    <>
      {success ? (
        alert("You are logged in!"),

        setTimeout(function() {
          window.location.href = "/";
        })
      ) : (
        <div>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input 
              type="text"
              id='username'
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor='password'>Password:</label>
            <input 
              type="password"
              id='password'
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button className='sign'>Sign In</button>
          </form>
          <p>Need an Account? <br/>
            <span className='line'>
              {/*put router link here*/}
              <ActiveLink href={"/register"}>Sign up</ActiveLink>
            </span>
          </p>
        </div>
      )}
    </>
  )
};

export default LoginLayout;





// const LoginLayout = () => {

//   const { setAuth } = useContext(AuthContext);
//   const userRef = useRef<HTMLInputElement>(null);
//   const errRef: any = useRef();

//   const [user, setUser] = useState('');
//   const [pwd, setPwd] = useState('');
//   const [errMsg, setErrMsg] = useState('');
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
    
//     if (userRef.current != null) {
//       userRef.current.focus();
//     };

//     // Obtém o token da cookie, se presente
//     const token = document.cookie.split('; ')
//       .find(row => row.startsWith('token='))
//       ?.split('=')[1];
//     if (token) {
//       setSuccess(true);
//     }
//   }, []);

//   const handleSubmit = async (e:any) => {
//     e.preventDefault();
  
//     const userObj = {
//       userName: user,
//       // userPwd: pwd,
//     };

//     try {
//       const response = await axios.post('/api/login', { user, pwd }, { withCredentials: true });
//       const { data } = response;


//       // setCookie('token', data.token, 30); expires in 30 days
//       setCookie('token', data.token, 0.01); // expira em 15 minutos

//       setSuccess(true);
//       sessionStorage.setItem("user", JSON.stringify(userObj));
//       // Obter o token da resposta da API
//       const token = data.token;

//       // Armazenar o token no sessionStorage
//       sessionStorage.setItem("token", token);

//     } catch (e) {
//       console.log((e as Error).message);
//       setErrMsg('Usuário não encontrado ou inválido')
//     }; 
//   }

//   const setCookie = (name: string, value: string, days: number) => {
//     const expires = new Date(Date.now() + days * 864e5).toUTCString();
//     document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
//   };

//   const getCookie = (name: string) => {
//     const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
//     if (match) return decodeURIComponent(match[2]);
//   };