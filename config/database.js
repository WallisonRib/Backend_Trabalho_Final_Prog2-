const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,  // Adicione a porta se necessário, por padrão é 5432
  ssl: {
    rejectUnauthorized: false,  // Use SSL se necessário
  }
});

pool.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados PostgreSQL!');
});

module.exports = pool;
