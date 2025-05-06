// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const { swaggerUi, specs } = require('./swagger');

const app = express();

// --- Middlewares ---
app.use(cors());
app.use(bodyParser.json());

// --- Swagger ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// --- Rotas ---
app.use('/api', routes);

// --- Tratamento de erros ---
app.use((req, res) => res.status(404).json({ error: 'Endpoint não encontrado' }));
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// --- Inicialização ---
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Servidor ouvindo em http://localhost:${port}`);
    console.log(`📚 Swagger em http://localhost:${port}/api-docs`);
  });
}

module.exports = app;
