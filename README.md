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
git clone https://github.com/WBRocha/ai-task-analyzer.git
cd ai-task-analyzer
```

---

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` (no backend ou na raiz) com:

```env
OPENAI_API_KEY=sua_chave_aqui
N8N_WEBHOOK_TEST_URL=sua_url_test
N8N_WEBHOOK_PROD_URL=sua_url_producao
NODE_ENV=development
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
## ▶️ Rodar tudo com um comando

Na raiz do projeto:

npm run dev

Isso iniciará o backend e o frontend simultaneamente.
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

O sistema envia automaticamente um POST para o webhook configurado no `.env`, suportando tanto modo de teste quanto produção.

### 🔀 Modos de execução do webhook

O sistema suporta dois modos:

* **Test (`/webhook-test`)**
  Usado durante desenvolvimento.
  Requer clicar em **"Execute workflow"** no n8n.

* **Produção (`/webhook`)**
  Funciona automaticamente quando o workflow está publicado (**Publish** no n8n).

O ambiente é definido pela variável:

```env
NODE_ENV=production
```
## 🔄 Workflow n8n

O workflow utilizado está disponível na pasta `/n8n` como export JSON.
---

## 🧪 Teste de falha do webhook

Para validar o comportamento **fire-and-forget**:

1. Alterar a URL do webhook para inválida
2. Criar uma tarefa
3. Verificar:

* ✔ tarefa salva no banco
* ✔ frontend responde normalmente
* ✔ erro aparece apenas no console do backend

---

## 🗄️ Banco de dados

* SQLite com arquivo `.db`
* Criado automaticamente ao iniciar o servidor

O banco é gerado automaticamente na primeira execução, não sendo necessário incluí-lo no repositório.

O arquivo `.db` não é versionado por motivos de segurança e boas práticas.

### Tabela `tasks`

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
* Separação de responsabilidades (routes, services, database)
* Integração n8n com suporte a test e produção
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
Wilson Bruno Rocha Santos


Desenvolvido como teste técnico para vaga de **Fullstack Junior**.

---

