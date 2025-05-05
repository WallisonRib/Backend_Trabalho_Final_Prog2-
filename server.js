const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const usersRoutes = require('./routes/index');

const app = express();

app.use(express.json());

// Rota da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Suas rotas
app.use('/api', usersRoutes);


module.exports = app;
