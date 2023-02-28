import { json } from "body-parser";
import { prisma } from "./prisma.server";
import express, { Request, Response } from 'express';

import { createUser } from './users.server';

import bcrypt from "bcryptjs";






export type RegisterForm = {
    userName: string;
    password: string;
    status: boolean;
    accountId: any;
};


export type LoginForm = {
    userName: string;
    password: string;
}



export const register = async (form: RegisterForm, req: Request, res: Response) => {
   
   

        
    const exists = await prisma.user.count({ where: { userName: form.userName } });


    if ( exists ) {

        return res.status(400).json("Esse userName já está sendo usado!");

    };


    const newUser = await createUser(form);

    if ( !newUser ) {

        return res.status(400).json("Alguma coisa deu errado! Tente novamente.");

    };

    return null;

};



// export const login = async (form: LoginForm, req: Request, res: Response) => {


//     const user = await prisma.user.findUnique({

//         where: { userName: form.userName}
//     });


//     if ( !user || !(await bcrypt.compare(form.password, user.password)) ) {

//         return res.status(400).json("Login incorreto! Verifique suas credenciais.");

//     } else {

//         // create here your JWTs token
//         res.json({ 'success': `User ${user.userName} is logged in` });
//     };
    
//     return null;

// };

export const login = async (form: LoginForm, req: Request, res: Response) => {
    
    
    
    const user = await prisma.user.findUnique({
        where: { userName: form.userName }
    });

    if (!user) {
        return res.status(400).json("Usuário não encontrado.");
    }

    const isPasswordValid = await bcrypt.compare(form.password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json("Senha incorreta.");
    }

    // create here your JWTs token
    res.json({ 'success': `User ${user.userName} is logged in` });
    return null;
};

