//Express => Para habilitar o CRUD.
import express, { Request, Response } from 'express';


import { createUser } from '../utils/users.server';


//Usado para criar rotas
const toDoRoutes = express.Router();

//Prisma => usado para criar esquemas para o DB.
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

// Create

toDoRoutes.post("/user", async (req: any, res: any) => {

    const { userName, password } = req.body;
    const token = jwt.sign({ password }, process.env.SECRET);
    console.log(token);

    const userAlreadyExist = await prisma.user.findUnique({
        where: {
            userName,
        }
    });


    if(userAlreadyExist){
        return res.status(404).json("Esse userName já está sendo usado!")
    }


    const user = await prisma.user.create({
            
        data: {
            
            userName,
            password:token,
            status: false,


        },



    // const user = new createUser();    




    });

    return res.status(201).json(user);


});




toDoRoutes.post("/account", async (req: Request, res: Response) => {


    const {  userId } = req.body;

    const account = await prisma.account.create({
        data: {

            balance: 100,
            userId,
        
        },
    });

    return res.status(201).json(account);
    
});








// Read

toDoRoutes.get("/user", async (req: any, res: any) => {

    const users = await prisma.user.findMany()
    return res.status(200).json(users);

});



//Rota para pegar usuário por nome
toDoRoutes.get("/user/:userName", async (req: Request, res: Response) => {

    const userName = req.params.userName;

    console.log(userName);

    const user = await prisma.user.findUnique({
        
        where: {
            userName: userName
        },
       select: { 
         userName: true,
         password: true
      }

      });


    console.log('Usuário encontrado!', user);
    return res.status(200).json(user);
    

});







////////////////////////








// Update

toDoRoutes.put("/user", async (req, res) => {

    const {id, userName, status} = req.body;

    if(!id){
        return res.status(400).json("Id is not valid!")
    };

    const userAlreadyExist = await prisma.user.findUnique({
        where: {
            id,
        }
    });

    if(!userAlreadyExist){
        return res.status(404).json("Esse usuário já existe!")
    }

    const user = await prisma.user.update ({

        where: {
            id,
        },
        data: {
            userName,
            status: true,
        },
    });

    return res.status(200).json(user);

});


module.exports = toDoRoutes;