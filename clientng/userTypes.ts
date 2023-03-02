export interface User {
    id: number;
    userName: string;
    password: string;
    status: boolean;
    accountId: number;
  }

export interface Props {
  users: User[];
}