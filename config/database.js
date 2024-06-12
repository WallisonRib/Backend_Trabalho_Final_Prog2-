const { Pool } = require('pg');
require('dotenv').config();  // Carrega as variáveis de ambiente do .env

const connectionString = process.env.POSTGRES_URL;  // Use a URL completa de conexão

const connection = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false  // Certifique-se de que isso está configurado conforme necessário
  }
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados PostgreSQL!');
});

module.exports = connection;
