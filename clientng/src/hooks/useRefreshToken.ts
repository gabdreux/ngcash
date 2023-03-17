import axios from '../api/axios';
import useAuth from './useAuth';

// Define a função useRefreshToken
const useRefreshToken = (): (() => Promise<string>) => {
 
  // Obtém a função setUserAuth do hook useAuth
  const { setUserAuth } = useAuth();

  // Define a função refresh que fará a requisição para atualizar o token
  const refresh = async (): Promise<string> => {
    // Faz uma requisição POST para a rota /api/refresh usando o axios
    const response = await axios.post('/api/refresh', {
      withCredentials: true,
    }) as { data: { accessToken: string; roles: string[] } };

    // Atualiza as informações do usuário armazenadas no estado global usando setUserAuth
    setUserAuth((prev: any) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });

    // Retorna o novo accessToken
    return response.data.accessToken;
  };

  // Retorna a função refresh
  return refresh;
};

export default useRefreshToken;
