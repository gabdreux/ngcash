import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";


const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return auth; // Retorna o estado de autenticação do AuthProvider
}


export default useAuth;