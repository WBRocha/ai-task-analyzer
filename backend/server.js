import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import fs from "fs";
console.log("EXISTE .env?", fs.existsSync("./.env"));

import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.js";

const app = express();

console.log("CHAVE:", process.env.OPENAI_API_KEY);

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
console.log("CHAVE:", process.env.OPENAI_API_KEY);