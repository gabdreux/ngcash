import express, { Request, Response } from 'express';



const user = [{ id: "1", userName: "Nome Teste", account: "1", status: false }];

const toDoRoutes = express.Router();



interface user {

    id: number;
    userName: string;
    account: number;

};


// CRUD

// Create

toDoRoutes.post("/user", (req: any, res: any) => {

    const { id, userName, account} = req.body;
    user.push({ id, userName, account, status: false });
    return res.status(201).json(user);


});


//Read

toDoRoutes.get("/user", (req: any, res: any) => {

    return res.status(200).json(user);

});



module.exports = toDoRoutes;