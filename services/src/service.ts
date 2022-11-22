import express, { Request, Response } from 'express';
const toDoRoutes = require("./routes/routes");
const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());
app.use(toDoRoutes);



app.get('/', (req: Request, res: Response) => { res.send('<h1>Hello World From Service! :)</h1>') });




// app.get("/", (req: Request, res: Response): void => {

//     res.json({ message: "Hello world from Service!" });

// });




app.listen('3000', (): void => { console.log(`Server is running on port: ${port}`) });
