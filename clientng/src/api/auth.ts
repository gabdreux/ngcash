// api/auth.ts

import axios from '../api/axios';

interface AuthResponse {
  userName: string;
  account: {
    balance: number;
  };
}

export async function fetchAuthData() {
  try {
    const response = await axios.post<AuthResponse>('/api/auth');
    return response.data;
  } catch (error) {
    console.log(error, "não foi possível coletar auth data");
    return null;
  }
};


