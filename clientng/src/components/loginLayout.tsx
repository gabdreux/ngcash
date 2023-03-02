import { useRef, useState, useEffect, useContext } from 'react';
import  AuthContext  from '../context/AuthProvider';
import axios from '../api/axios';
import ActiveLink from "./activeLink";


const LoginLayout = () => {

  const { setAuth } = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef: any = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false); //or use a route to navigation


  useEffect(() => {

    if (userRef.current != null) {
        userRef.current.focus();
    }
     
  }, []);


  useEffect(() => {
    // setErrMsg('');
    console.log('useEffect', user);
  }, [user, pwd]);



  const handleSubmit = async (e:any) => {
    console.log(user, pwd);
    e.preventDefault();
    try {
    const validation = axios.get(
        `http://localhost:5000/user/${user}`
    // {
    //     headers: { 'Content-Type': 'application/json'},
    //     withCredentials: true
    // } 
    );
    const userObj = {
      userName: "",
      accountId: "",
    };
    sessionStorage.setItem("user", JSON.stringify(userObj));
    setSuccess(true);
  } catch  (e) {
    console.log((e as Error).message);
    setErrMsg('Usuário não encontrado ou inválido')
  };

}

  return (

    <>

    {success ? (
      <div>
        <h1>You are logged in!</h1>
      </div>
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