import express, { Request, Response } from 'express';
const router = require("./routes/routes");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require ("cors");
// const logEvents = require("../middeleware/logEvents.js");
const { logger } = require("../middeleware/logEvents.js");


const options = {
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    origin:'http://localhost:3000', 
    // origin:'*',
    credentials: true,
    optionSuccessStatus: 200,
};



//Custom middleware logger.
app.use(logger);

app.use(express.json());
//Cross Origin Resource Sharing
app.use(cors(options));
app.use(router);
//Allow reciving data from forms.
// app.use(express.urlencoded({ extended: false }));
//Serve static files.
//app.use(express.static(path.join(__dirname, '/public')));



app.get('/', (req: Request, res: Response) => { res.send('<h1>Hello World From Service! :)</h1>') });



// const http = require('http');
// const path = require('path');
// const fs = require('fs');
// const fsPromises = require('fs').promises;


// app.get('^/$|/index(.html)?', (req: Request, res: Response) => { 
//     res.sendFile(path.join(__dirname, 'views', 'index.html');
// });


// app.get('^/$|/index(.html)?', (req: Request, res: Response) => { 
//     res.redirect(301, '/index'); //302 by default
// });

// app.get('/', (req: Request, res: Response) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html')
// };



app.listen(PORT, (): void => { console.log(`Server is running on port: ${PORT}`) });


