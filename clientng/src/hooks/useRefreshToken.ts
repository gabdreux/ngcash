import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = (): (() => Promise<string>) => {
    const { setAuth } = useAuth();

    const refresh = async (): Promise<string> => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        }) as { data: { accessToken: string; roles: string[] } };

        setAuth((prev: any) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
