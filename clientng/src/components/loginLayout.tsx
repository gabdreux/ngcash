import { useRef, useState, useEffect, useContext } from 'react';
import  AuthContext  from '../context/AuthProvider';
import axios from '../api/axios';

const LOGIN_URL = '/login';

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
    setErrMsg('');
  }, [user, pwd]);



  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // console.log(user, pwd); 20:39 do 01.
    setUser('');
    setPwd('');
    setSuccess(true);
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
        <a href='#'>Sign Up</a>
      </span>
      </p>


    </div>
      )}
    </>
  )
};


export default LoginLayout;