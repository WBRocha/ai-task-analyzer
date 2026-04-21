import axios from "axios";
import express from "express";
import db from "../database/db.js";
import { analyzeTask } from "../services/openai.js";

const router = express.Router();

// GET - listar tarefas
router.get("/", (req, res) => {
  const tasks = db.prepare("SELECT * FROM tasks ORDER BY created_at DESC").all();
  res.json(tasks);
});

// DELETE - remover tarefa (BÔNUS)
router.delete("/:id", (req, res) => {
  db.prepare("DELETE FROM tasks WHERE id = ?").run(req.params.id);
  res.status(204).send();
});

// POST - criar tarefa (COM IA)
router.post("/", async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    if (!titulo || !descricao) {
      return res.status(400).json({ erro: "Campos obrigatórios" });
    }

    // 🔥 AQUI CHAMA A IA
    const ai = await analyzeTask(descricao);

    const result = db.prepare(`
      INSERT INTO tasks (titulo, descricao, categoria, dificuldade, proximo_passo)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      titulo,
      descricao,
      ai.categoria,
      ai.dificuldade,
      ai.proximo_passo
    );

    const task = db.prepare("SELECT * FROM tasks WHERE id = ?")
  .get(result.lastInsertRowid);

// 🔗 envia para o n8n (fire and forget)
axios.post(process.env.N8N_WEBHOOK_URL, task)
  .catch(err => console.error("Erro no webhook:", err));
res.status(201).json(task);

  } catch (err) {
  console.error(err);
  res.status(502).json({ erro: "Erro na resposta da IA" });
}
});

export default router;