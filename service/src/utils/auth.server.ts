import { json } from "body-parser";
import { prisma } from "./prisma.server";
import express, { Request, Response } from 'express';

import { createUser } from './users.server';

import bcrypt from "bcryptjs";


//Usado para criar rotas
const router = express.Router();

//Prisma => usado para criar esquemas para o DB.
const { PrismaClient } = require("@prisma/client")

require("dotenv-safe").config();




export type RegisterForm = {
    userName: string;
    password: string;
    status: boolean;
    accountId: any;
};



export const login = async (form: any, req: Request, res: Response) => {
    
    const respostaUser = JSON.stringify(form.body.user);
    const respostaPWD = JSON.stringify(form.body.pwd);
    
    const user = await router.get(`/user/${respostaUser}`)
    console.log(user);
    // if (!user) {
    //     // return res.status(400).json(
    //         console.log("Usuário não encontrado.");
    // }
    // console.log("Usuário encontrado!")
    // const isPasswordValid = await bcrypt.compare(respostaPWD, user.password);

    // if (!isPasswordValid) {
    //     return res.status(400).json("Senha incorreta.");
    // }

    // console.log("Senha correta!")

    // // create here your JWTs token
    // res.json({ 'success': `User ${respostaUser} is logged in` });
    // return null;
};

