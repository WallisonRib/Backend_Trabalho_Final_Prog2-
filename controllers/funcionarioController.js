const connection = require('../config/database');

exports.createFuncionario = (req, res) => {
  const { CPF, Nome, Email, Senha } = req.body;
  connection.query('INSERT INTO Funcionario (CPF, Nome, Email, Senha) VALUES (?, ?, ?, ?)', [CPF, Nome, Email, Senha], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ CPF, Nome, Email, Senha });
  });
};

exports.getFuncionarios = (req, res) => {
  connection.query('SELECT * FROM Funcionario', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
};

exports.updateFuncionario = (req, res) => {
  const { CPF } = req.params;
  const { Nome, Email, Senha } = req.body;
  connection.query('UPDATE Funcionario SET Nome = ?, Email = ?, Senha = ? WHERE CPF = ?', [Nome, Email, Senha, CPF], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ CPF, Nome, Email, Senha });
  });
};

exports.deleteFuncionario = (req, res) => {
  const { CPF } = req.params;
  connection.query('DELETE FROM Funcionario WHERE CPF = ?', [CPF], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Funcionario deletado' });
  });
};
