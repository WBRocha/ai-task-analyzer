import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeTask(descricao) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
Voce e um assistente de produtividade.

Receba a descricao de uma tarefa e retorne APENAS um JSON valido (sem markdown, sem explicacao) com os campos:

- "categoria" (uma entre: Estudo, Trabalho, Pessoal, Saude, Financeiro, Criativo)
- "dificuldade" (Baixa, Media ou Alta)
- "proximo_passo" (uma acao concreta e especifica que a pessoa pode fazer nos proximos 30 minutos para avancar nessa tarefa).
`
        },
        {
          role: "user",
          content: descricao
        }
      ]
    });

    let content = response.choices[0].message.content;

    content = content.replace(/```json|```/g, "").trim();

    let data;

try {
  data = JSON.parse(content);

  if (!data.categoria || !data.dificuldade || !data.proximo_passo) {
    throw new Error("Campos inválidos");
  }

} catch (err) {
  throw new Error("Erro ao processar resposta da IA");
}

return data;

  } catch (error) {
    console.error("Erro na OpenAI:", error);

    throw new Error("Erro na OpenAI");
  }
}