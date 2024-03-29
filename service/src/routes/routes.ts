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
  const { userName, pwd } = req.body; // Pega o userName e o password vindo do front
  const token = await bcrypt.hash(pwd, 10); // Gerar o hash da senha com o bcrypt
  console.log(token);
  console.log(pwd, userName);
  
  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      userName,
    }
  });
  
  if (userAlreadyExists) {
    console.log("Esse username já está sendo usado");
    return res.status(409).json("Username already taken");
    
  };
  
  let account;
  if (!userAlreadyExists) {
    account = await prisma.account.create({
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
  }
  
  const { id: accountId } = account; // extrai o id do objeto account
  console.log("usuário criado com successo!");
  return res.status(201).json({ userName, status: false, account, accountId });
  
  });


  





// Read

router.get("/user", async (req: any, res: any) => {

    const users = await prisma.user.findMany()
    return res.status(200).json(users);

});


//Rota para pegar usuário por nome
router.get("/user/:userName", async (req: Request, res: Response) => {

  const userName = req.params.userName;

  console.log(userName);

  const user = await prisma.user.findUnique({
      
      where: {
          userName: userName
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

  console.log('Usuário encontrado!', user);
  return res.status(200).json({user});
  
});





//Rota para login
const cookieParser = require('cookie-parser');
router.use(cookieParser());


router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



router.post("/login", async (req: Request, res: Response) => {
  try {
    const { user, pwd } = req.body;

    // Busca o usuário no banco de dados
    const User = await prisma.user.findUnique({
      where: {
        userName: user,
      },
      select: {
        userName: true,
        password: true,
        id: true,
        accountId: true,
        account: {
          select: {
            balance: true,
          },
        },
      },
    });

    
    // Retorna erro se o usuário não for encontrado
    if (!User) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }

    // Verifica se a senha está correta
    const isPasswordCorrect = await bcrypt.compare(pwd, User.password);

    // Retorna erro se a senha estiver incorreta
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Incorrect username or password" });
    }

    // Cria o payload do token
    const payload = {
      id: User.id,
      userName: User.userName,
      accountId: User.accountId,
    };

    // Gera o token com o payload e a chave secreta
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "15min" });

    // Cria o objeto de retorno com os dados do usuário e o token
    const result = {
      ...payload,
      balance: User.account.balance,
      token
    };

    res.header("Authorization", `Bearer ${token}`); // Adiciona o token no header de resposta
    // Retorna os dados do usuário e adiciona o token no header de resposta
    res.status(200).json({ message: "Login successful", ...result });
    

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});











// importa o pacote jsonwebtoken
const jwt = require('jsonwebtoken');

// obtém as chaves secretas do ambiente
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

// importa os middlewares de autenticação
const { verifyToken, verifyRefreshToken } = require('../../middleware/auth.middleware');
// const session = require('express-session');
import session from 'express-session';


// define uma rota para testar a autenticação
router.get('/authTest', verifyToken, (req, res) => {
  return res.status(200).json({ teste: true });
});


// define uma rota para autenticar o usuário
router.post('/auth', (req, res) => {
  const { userName, password } = req.body;

  // cria um token de atualização com o nome do usuário e a senha (fica de base para conferir depois com o token criado a seguir ou com o token criado na rota refreshToken)
  const refreshToken = jwt.sign({ userName, password }, JWT_REFRESH_SECRET, { expiresIn: '900s' });

  // cria um token de acesso com o token de atualização
  const token = jwt.sign({ refreshToken }, JWT_SECRET, { expiresIn: '20s' });

    // Armazena o token na sessionStorage
    // req.session.token = token;

  // retorna os tokens gerados
  return res.status(200).json({ token, refreshToken });
});


// define uma rota para atualizar o token de acesso
router.post('/refresh', verifyRefreshToken, (req, res) => {
  const { refreshToken } = req.body;

  // cria um novo token de acesso com o token de atualização recebido
  const token = jwt.sign({ refreshToken }, JWT_SECRET, { expiresIn: '20s' });

  // retorna o novo token de acesso gerado
  return res.status(200).json({ token });
});








interface TransferRequest {
  sourceId: number;
  destinationId: number;
  value: number;
}

interface ErrorResponse {
  message: string;
}


router.post('/transfer', async (req: Request<{}, {}, TransferRequest>, res: Response<ErrorResponse>) => {
  const { sourceId, destinationId, value } = req.body;

  // Verifica se as contas existem
  const sourceAccount = await prisma.account.findUnique({ where: { id: sourceId } });
  const destinationAccount = await prisma.account.findUnique({ where: { id: destinationId } });

  if (!sourceAccount || !destinationAccount) {
    return res.status(404).json({ message: 'Conta não encontrada' });
  }

  // Verifica se há saldo suficiente na conta de origem
  if (sourceAccount.balance < value) {
    return res.status(400).json({ message: 'Saldo insuficiente' });
  }

  try {
    // Realiza a transferência
    await prisma.transaction.create({
      data: {
        value,
        source: { connect: { id: sourceId } },
        destination: { connect: { id: destinationId } },
      },
    });

    // Atualiza os saldos das contas
    await prisma.account.update({
      where: { id: sourceId },
      data: { balance: { decrement: value } },
    });
    await prisma.account.update({
      where: { id: destinationId },
      data: { balance: { increment: value } },
    });

    res.status(200).json({ message: 'Transferência realizada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao realizar transferência' });
  }
});



// router.get('/transactions', async (req: Request, res: Response) => {
//   const { accountId } = req.body;

//   try {
//     const transactions = await prisma.transaction.findMany({
//       where: {
//         sourceId: accountId,
//       },
//     });
//     res.status(200).json(transactions);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Erro ao buscar transações' });
//   }
// });



router.get('/transactions', async (req: Request, res: Response) => {
  const { accountId } = req.query;
  const numAccountId = Number(accountId);
  console.log("accountId no server:", accountId);

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            sourceId: numAccountId,
          },
          {
            destinationId: numAccountId,
          },
        ],
      },
    });
    console.log('Transactions:', transactions)
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar transações' });
  }
});




module.exports = router;






