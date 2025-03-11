const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Configuração da SendPulse
const SENDPULSE_API_URL = 'https://api.sendpulse.com/smtp/emails';
const SENDPULSE_API_KEY = 'SEU_API_KEY_AQUI';
const SENDPULSE_SECRET = 'SEU_SECRET_AQUI';

// Link de download do produto (pode mudar se precisar)
const linkDownload = "https://pCloud.com/link-do-arquivo";

// Rota para receber webhook da Yampi
app.post('/webhook-yampi', async (req, res) => {
    try {
        const { email } = req.body;

        // Envia o e-mail pelo SendPulse
        await axios.post(SENDPULSE_API_URL, {
            email: {
                from: { email: "seuemail@seusite.com", name: "Seu Site" },
                to: [{ email: email }],
                subject: "Seu link de download",
                html: `<p>Obrigado pela sua compra! Aqui está seu link de download:</p>
                       <p><a href="${linkDownload}">${linkDownload}</a></p>`
            }
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SENDPULSE_API_KEY}:${SENDPULSE_SECRET}`
            }
        });

        console.log(`E-mail enviado para ${email} com o link ${linkDownload}`);
        res.sendStatus(200);
    } catch (error) {
        console.error("Erro ao processar webhook:", error);
        res.sendStatus(500);
    }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => console.log("Webhook rodando na porta 3000"));
