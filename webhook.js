const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Rota para receber POST
app.post('/', (req, res) => {
    console.log("Recebido:", req.body);
    res.status(200).json({ mensagem: "Recebido com sucesso!" });
});

// Rota padrão para testar se o servidor está online
app.get('/', (req, res) => {
    res.send("Servidor Online");
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Webhook rodando na porta ${PORT}`);
});
