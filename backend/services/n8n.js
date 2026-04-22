const WEBHOOK_TEST = process.env.N8N_WEBHOOK_TEST_URL;
const WEBHOOK_PROD = process.env.N8N_WEBHOOK_PROD_URL;

function getWebhookUrl() {
  return process.env.NODE_ENV === "production"
    ? WEBHOOK_PROD
    : WEBHOOK_TEST;
}

export function sendToN8n(task) {
  const url = getWebhookUrl();

    console.log("Webhook usado:", url);

  if (!url) {
    console.warn("Webhook URL não configurada");
    return;
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  }).catch((err) => {
    console.error("Erro no webhook:", err.message);
  });
}