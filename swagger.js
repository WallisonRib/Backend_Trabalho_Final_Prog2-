const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express'); // Importar também o swagger-ui-express

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
      description: 'Servidor de desenvolvimento'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { 
  swaggerSpec,
  setupSwagger: (app) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
};