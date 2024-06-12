const connection = require('../config/database');

exports.createFuncionario = (req, res) => {
  const { CPF, Nome, Email, Senha } = req.body;
  const query = 'INSERT INTO Funcionario (CPF, Nome, Email, Senha) VALUES ($1, $2, $3, $4) RETURNING *';

  connection.query(query, [CPF, Nome, Email, Senha], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result.rows[0]);
  });
};

exports.getFuncionarios = (req, res) => {
  connection.query('SELECT * FROM Funcionario', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results.rows);
  });
};

exports.updateFuncionario = (req, res) => {
  const { CPF } = req.params;
  const { Nome, Email, Senha } = req.body;
  const query = 'UPDATE Funcionario SET Nome = $1, Email = $2, Senha = $3 WHERE CPF = $4';

  connection.query(query, [Nome, Email, Senha, CPF], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ CPF, Nome, Email, Senha });
  });
};

exports.deleteFuncionario = (req, res) => {
  const { CPF } = req.params;
  const query = 'DELETE FROM Funcionario WHERE CPF = $1';

  connection.query(query, [CPF], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Funcionario deletado' });
  });
};
