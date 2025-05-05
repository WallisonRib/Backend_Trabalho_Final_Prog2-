// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const routes = require('./routes');

const app = express();

// --- Middlewares ---
app.use(cors());
app.use(bodyParser.json());

// --- Swagger ---
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Livros',
      version: '1.0.0',
      description: 'Documentação gerada via Swagger',
    },
  },
  apis: ['./routes/*.js'],
};
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// --- Rotas ---
app.use('/api', routes);

// --- Tratamento de erros simples ---
app.use((req, res) => res.status(404).json({ error: 'Endpoint não encontrado' }));
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// --- Somente chama listen se for executado diretamente ---
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Servidor ouvindo em http://localhost:${port}`);
    console.log(`📚 Swagger em http://localhost:${port}/api-docs`);
  });
}

// Exporta o app para plataformas serverless
module.exports = app;
