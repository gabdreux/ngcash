//Express => Para habilitar o CRUD.
import express, { Request, Response } from 'express';

import bcrypt from "bcryptjs";




//Usado para criar rotas
const router = express.Router();

//Prisma => usado para criar esquemas para o DB.
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

require("dotenv-safe").config();



// Create
router.post("/register", async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    const token = jwt.sign({ password }, process.env.SECRET);
  
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        userName,
      }
    });
  
    if (userAlreadyExists) {
      return res.status(404).json("Username already taken");
    }
  
  const account = await prisma.account.create({
      data: {
        balance: 100,
        user: {
          create: {
            userName,
            password: token,
            status: false,
          },
        },
      },
    });
    console.log("usuário criado com successo!");
    return res.status(201).json({ userName, status: false, account });
  });
  



// Read

router.get("/user", async (req: any, res: any) => {

    const users = await prisma.user.findMany()
    return res.status(200).json(users);

});



//Rota para pegar usuário por nome
router.post("/login", async (req: Request, res: Response) => {

  

  console.log(req.body);

  const user = await prisma.user.findUnique({
      
      where: {
          userName: req.body.user
      },
     select: { 
       userName: true,
       password: true,
       id: true,
       account: {
         select: {
           balance: true
         }
       }
    }

    });
    const pwd = req.body.pwd;
    console.log(user);
    // const token = jwt.sign({ pwd }, process.env.SECRET);
    const token = jwt.sign({ pwd }, JWT_SECRET);
    if (token == user.password) {
      console.log("Senha correta");
    } else {
      console.log("Senha correta");
    }
    // console.log(user.password);
    // console.log(token.toString());
  // console.log('Usuário encontrado!', user);
  // return res.status(200).json({user});
  
});






const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const { verifyToken, verifyRefreshToken } = require ('../../middleware/auth.middleware');


router.get('/authTest', verifyToken, (req, res) => {
  return res.status(200).json({ teste: true });
});


router.post('/auth', (req, res) => {
  const { userName, password } = req.body;
  const refreshToken = jwt.sign({ userName, password }, JWT_REFRESH_SECRET, { expiresIn: '1800s' });
  const token = jwt.sign({ refreshToken }, JWT_SECRET, { expiresIn: '20s' });
  return res.status(200).json({ token, refreshToken, userName });
});

router.post('/refresh', verifyRefreshToken, (req, res) => {               
  const { userName } = req.body;
  const { refreshToken } = req.body;
  const token = jwt.sign({ refreshToken }, JWT_SECRET, { expiresIn: '20s' });
  return res.status(200).json({ token, userName });
});































////////////////////////

// Update

// router.put("/user", async (req, res) => {

//     const {id, userName, status} = req.body;

//     if(!id){
//         return res.status(400).json("Id is not valid!")
//     };

//     const userAlreadyExist = await prisma.user.findUnique({
//         where: {
//             id,
//         }
//     });

//     if(!userAlreadyExist){
//         return res.status(404).json("Esse usuário já existe!")
//     }

//     const user = await prisma.user.update ({

//         where: {
//             id,
//         },
//         data: {
//             userName,
//             status: true,
//         },
//     });

//     return res.status(200).json(user);

// });


module.exports = router;




