import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from "../hooks/useAuth";



// Interface de dados de autenticação
interface AuthData {
  accessToken?: string;
  refreshToken?: string;
}

// Interface de propriedades do componente PersistLogin
interface PersistLoginProps {
  children: React.ReactNode;
}


// Componente que verifica se há um accessToken válido antes de renderizar o conteúdo
const PersistLogin = ({ children }: PersistLoginProps) => {

    // Definindo o estado isLoading como true para indicar que o conteúdo ainda não foi carregado
    const [isLoading, setIsLoading ] = useState<boolean>(true);
    // Utilizando os hooks useRefreshToken e useAuth para obter as informações de autenticação
    const refresh = useRefreshToken();
    const { auth }: { auth: AuthData } = useAuth();

    // Utilizando o useEffect para verificar se há um refreshToken e tentar obter um novo accessToken válido
    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        // Verificando se há um accessToken válido antes de verificar o refreshToken
        !auth?.accessToken  ? verifyRefreshToken() : setIsLoading(false);
    }, [auth, refresh]);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading]);

    
    // Retornando o conteúdo do componente de acordo com o estado isLoading
    return (
        <>
            { isLoading 
                ? <p>loading!</p>
                : <>{children}</>
            }
        </>
    );
};

export default PersistLogin;