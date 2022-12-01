"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const toDoRoutes = require("./routes/routes");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const cors = require("cors");
app.use(express_1.default.json());
app.use(cors());
app.use(toDoRoutes);
app.get('/', (req, res) => { res.send('<h1>Hello World From Service! :)</h1>'); });
// app.get("/", (req: Request, res: Response): void => {
//     res.json({ message: "Hello world from Service!" });
// });
app.listen('5000', () => { console.log(`Server is running on port: ${port}`); });
