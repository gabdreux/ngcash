import { Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from "../hooks/useAuth";

interface AuthData {
  accessToken?: string;
  refreshToken?: string;
}

interface PersistLoginProps {
  children: React.ReactNode;
}

const PersistLogin = ({ children }: PersistLoginProps) => {
    const [isLoading, setIsLoading ] = useState<boolean>(true);
    const refresh = useRefreshToken();
    const { auth }: { auth: AuthData } = useAuth();

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

        !auth?.accessToken  ? verifyRefreshToken() : setIsLoading(false);
    }, [auth, refresh]);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading]);

    
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
