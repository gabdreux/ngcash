"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const toDoRoutes = express_1.default.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// Create
toDoRoutes.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    const userAlreadyExist = yield prisma.user.findUnique({
        where: {
            userName,
        }
    });
    if (userAlreadyExist) {
        return res.status(404).json("Esse userName já está sendo usado!");
    }
    const user = yield prisma.user.create({
        data: {
            userName,
            password,
            status: false,
            accountId: {},
            test: "oioi",
        },
    });
    return res.status(201).json(user);
}));
toDoRoutes.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    const account = yield prisma.user.create({
        data: {
            balance: 100,
            userId,
        },
    });
    return res.status(201).json(account);
}));
// Read
toDoRoutes.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    return res.status(200).json(users);
}));
////////////////////////
// Update
toDoRoutes.put("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userName, status } = req.body;
    if (!id) {
        return res.status(400).json("Id is not valid!");
    }
    ;
    const userAlreadyExist = yield prisma.user.findUnique({
        where: {
            id,
        }
    });
    if (!userAlreadyExist) {
        return res.status(404).json("Esse usuário já existe!");
    }
    const user = yield prisma.user.update({
        where: {
            id,
        },
        data: {
            userName,
            status: true,
        },
    });
    return res.status(200).json(user);
}));
module.exports = toDoRoutes;
