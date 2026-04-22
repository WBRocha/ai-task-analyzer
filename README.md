# 🚀 AI Task Analyzer

Sistema fullstack para cadastro e análise inteligente de tarefas utilizando **React, Node.js, SQLite, OpenAI e n8n**.

---

## 📌 Sobre o projeto

O **AI Task Analyzer** permite que o usuário cadastre tarefas e receba automaticamente uma análise feita por inteligência artificial, incluindo:

* 📂 Categoria da tarefa
* 📊 Nível de dificuldade
* ⚡ Próximo passo sugerido

Além disso, o sistema salva os dados em banco SQLite e dispara um webhook para automação via n8n.

---

## 🧠 Tecnologias utilizadas

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express

### Banco de dados

* SQLite (better-sqlite3)

### Integrações

* OpenAI API (gpt-4o-mini)
* n8n (webhook)

---

## ⚙️ Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPO.git
cd ai-task-analyzer
```

---

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
OPENAI_API_KEY=sua_chave_aqui
N8N_WEBHOOK_URL=sua_url_do_webhook
PORT=3000
```

---

### 3. Rodar o backend

```bash
cd backend
npm install
npm run dev
```

Servidor rodará em:

```
http://localhost:3000
```

---

### 4. Rodar o frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse no navegador:

```
http://localhost:5173
```

---

## 🔗 Endpoints da API

### ➤ Criar tarefa

```
POST /tasks
```

### ➤ Listar tarefas

```
GET /tasks
```

### ➤ Deletar tarefa (bônus)

```
DELETE /tasks/:id
```

### ➤ Estatísticas (bônus)

```
GET /tasks/stats
```

---

## 🔄 Integração com n8n

O sistema envia automaticamente um POST para o webhook configurado no `.env`.

### ✔ Comportamento importante

* O webhook é **fire-and-forget**
* Não bloqueia a resposta do backend
* Mesmo com n8n offline, a tarefa é salva normalmente

---

## 🧪 Teste de falha do webhook

Para validar:

1. Alterar a URL do webhook para inválida
2. Criar uma tarefa
3. Verificar:

   * ✔ tarefa salva
   * ✔ frontend responde
   * ✔ erro apenas no console

---

## 🗄️ Banco de dados

* SQLite com arquivo `.db`
* Criado automaticamente ao iniciar o servidor

Tabela `tasks`:

* id
* titulo
* descricao
* categoria
* dificuldade
* proximo_passo
* created_at

---

## 📊 Funcionalidades

✔ Criar tarefas com IA
✔ Listar tarefas
✔ Exibir análise da IA
✔ Dashboard de estatísticas
✔ Integração com webhook
✔ Tratamento de erro básico

---

## ⭐ Diferenciais implementados

* Endpoint `/tasks/stats`
* DELETE `/tasks/:id`
* UI com Tailwind
* Atualização dinâmica de dados
* Estrutura organizada (routes, services, database)
* Git com commits semânticos

---

## 🔐 Segurança

* `.env` não versionado
* `.env.example` disponível
* API key protegida

---

## 📁 Estrutura do projeto

```
ai-task-analyzer/
  frontend/
  backend/
    routes/
    services/
    database/
  .env.example
  README.md
```

---

## 👨‍💻 Autor

Desenvolvido como teste técnico para vaga de **Fullstack Junior**.

---
