const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API para Livraria com PostgreSQL',
    version: '1.0.0',
    description: 'Documentação gerada com Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Onde estão suas rotas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
