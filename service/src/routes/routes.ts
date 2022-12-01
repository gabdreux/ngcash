import express, { Request, Response } from 'express';
const toDoRoutes = express.Router();
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();



// Create

toDoRoutes.post("/user", async (req: any, res: any) => {

    const { userName, password } = req.body;


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
            password,
            status: false,


        },
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