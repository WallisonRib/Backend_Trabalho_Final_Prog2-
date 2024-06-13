// server.js

const app = require('./app');
const port = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
