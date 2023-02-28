export interface GetUserResults {
    info:    Info;
    results: User[];
}

export interface Info {
    count: number;
    pages: number;
    next:  string;
    prev:  null;
}

export interface User {
    userName: string;
    password: string;
    id: number;
    account:  Account;
}

export interface Account {
    balance: string;
}
