import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

// O hook personalizado useAuth utiliza o hook useContext para acessar o contexto AuthContext definido pelo AuthProvider
const useAuth = () => {
    const { auth } = useContext(AuthContext);
     // O hook useDebugValue é utilizado para exibir informações sobre o estado do hook personalizado no DevTools do navegador.
    // Neste caso, a mensagem "Logged In" será exibida se o usuário estiver logado e "Logged Out" caso contrário.
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    console.log("Data do useAuth:", auth);
    // Retorna o estado de autenticação do AuthProvider
    return auth; // Retorna o estado de autenticação do AuthProvider
}


export default useAuth;