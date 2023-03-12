  import { useRef, useState, useEffect, useContext } from 'react';
  import AuthContext from '../context/AuthProvider';
  import axios from '../api/axios';
  import ActiveLink from "./activeLink";
  interface AuthState {
    isAuthenticated: boolean;
  }
  
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
    const [isAuthenticated, setIsAuthenticated] = useState<AuthState["isAuthenticated"]>(false);
  
    useEffect(() => {
      
      if (userRef.current != null) {
        userRef.current.focus();
      };
  
  
      const token = getToken();
      if (token) {
        setSuccess(true);
        setIsAuthenticated(true);
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
        setIsAuthenticated(true);
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
      setIsAuthenticated(false);
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