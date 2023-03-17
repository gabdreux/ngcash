import axios from '../api/axios';


// Interface que define o formato dos dados de resposta da autenticação
interface AuthResponse {
  userName: string;
  account: {
    balance: number;
  };
}


// Função assíncrona que realiza uma requisição HTTP para obter os dados de autenticação
export async function fetchAuthData() {
  try {
    // Faz uma requisição POST para o endpoint /api/auth, aguardando a resposta
    const response = await axios.post<AuthResponse>('/api/auth');
    // Imprime a resposta no console, para fins de depuração
    console.log("RESPONSE AUTH:", response);
    // Retorna os dados de resposta da autenticação, que estão na propriedade 'data' do objeto 'response'
    return response.data;
    
  } catch (error) {
    console.log(error, "não foi possível coletar auth data");
    return null;
  }
};


