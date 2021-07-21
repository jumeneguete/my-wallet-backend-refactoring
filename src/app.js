import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import connection from "./database.js";
import * as userController from "./controllers/userController.js";
import * as financialController from "./controllers/financialController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);
app.post("/sign-in", userController.signIn);
app.post("/financial-events", financialController.addRegister);
app.get("/financial-events", financialController.getRegisters);
app.get("/financial-events/sum", financialController.getTotal);

export default app;
