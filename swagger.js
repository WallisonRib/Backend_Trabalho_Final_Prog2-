// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Livros',
      version: '1.0.0',
    },
    servers: [
      { url: 'http://localhost:3000' }, // ou Vercel URL
    ],
  },
  apis: ['./controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwaggerDocs = (app) => {
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

module.exports = {
  swaggerSpec,
  setupSwaggerDocs,
};
