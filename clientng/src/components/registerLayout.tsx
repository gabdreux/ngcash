import React, { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "@/api/axios";
import ActiveLink from "./activeLink";


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{9,24}$/;

const REGISTER_URL = '/register';



const ResgisterLayout = () => {
    
    const userRef = useRef<HTMLInputElement>(null);
    const errRef: any = useRef();

    const [userName, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    //used for setting the focus when the component loads
    useEffect(() => {

        if (userRef.current != null) {
            userRef.current.focus();
        }
         
    }, []);

    // Valida o nome de usuário toda vez que ele é alterado
    useEffect(() => {

        const result = USER_REGEX.test(userName);
        console.log(result);
        console.log(userName);
        setValidName(result);
         
    }, [userName]);

    // Valida a senha e a senha de confirmação toda vez que eles são alterados
    useEffect(() => {

        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatchPwd(match);
         
    }, [pwd, matchPwd]);


     // Limpa a mensagem de erro toda vez que o nome de usuário, a senha ou a senha de confirmação são alterados
    useEffect(() => {
        setErrMsg('');
    }, [userName, pwd, matchPwd]);

    // Lida com a submissão do formulário de registro
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(userName);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg('Invalid Entry!');
            return;
        }

        // setSuccess(true);


        console.log(userName, pwd);
        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ userName, pwd }),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
                console.log(response.data);
                // console.log(response.accesToken);
                console.log(JSON.stringify(response));
                setSuccess(true);
                // clear input fields
        } catch  (e) {
            console.log((e as Error).message);
            setErrMsg('Registration failed!')
        };
        errRef.current.focus();
    };


    return (

        <>
        {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    <a href="/login">Sign In</a>
                </p>
            </section>
        ) : (

        <section>

            <p ref={errRef as React.RefObject<any>} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                {errMsg}
            </p>

            <div className="registered">
                <h1>Register to continue!</h1>
            </div>

            <form onSubmit={handleSubmit}>

                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validName || !userName ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>

                <input 
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />

                <p
                    id="uinote" className={userFocus && userName && !validName ? "instructions" : "offscreen"}
                >
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    4 to 24 characters.<br/>
                    Must begin with a letter.<br/>
                    Letters, numbers, underscores, hyphens allowed.
                </p>


                <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>                

                <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />


                <p
                    id="uinote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
                >
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Must include uppercase and lowercase letters, a number and a special character.<br/>
                    Must begin with a letter.<br/>
                    Allowed special characters: 
                    <span aria-label="exclamation mark">!</span>
                    <span aria-label="at symbol">@</span>
                    <span aria-label="hashtag">#</span>
                    <span aria-label="dollar sign">$</span>
                    <span aria-label="percent">%</span>
                </p>


                <label htmlFor="confirm_pwd">
                    Confirm password:
                    <span className={validMatchPwd && matchPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validMatchPwd || !matchPwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>                

                <input 
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatchPwd ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchPwdFocus(true)}
                    onBlur={() => setMatchPwdFocus(false)}
                />


                <p
                    id="uinote" className={matchPwdFocus && !validMatchPwd ? "instructions" : "offscreen"}
                >
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Must match the first password input field.<br/>
                </p>                

                <button className="sign" disabled={!validName || !validPwd || !validMatchPwd ? true: false}>Sign Up</button>
            </form>

            <div className="registered">
                <p>
                    Already registered?<br/>
                    <span className="line">
                        {/* {put router link here} */}
                        <ActiveLink href={"/login"}>Sign in</ActiveLink>
                    </span>
                </p>
            </div>



        </section>

            )}
        
        </>
        
    )
};


 


export default ResgisterLayout;