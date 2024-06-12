const connection = require('../config/database');

exports.createAutor = (req, res) => {
  const { CNPJ, Nome } = req.body;
  connection.query('INSERT INTO Autor (CNPJ, Nome) VALUES (?, ?)', [CNPJ, Nome], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ CNPJ, Nome });
  });
};

exports.getAutores = (req, res) => {
  connection.query('SELECT * FROM Autor', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
};

exports.updateAutor = (req, res) => {
  const { CNPJ } = req.params;
  const { Nome } = req.body;
  connection.query('UPDATE Autor SET Nome = ? WHERE CNPJ = ?', [Nome, CNPJ], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ CNPJ, Nome });
  });
};

exports.deleteAutor = (req, res) => {
  const { CNPJ } = req.params;
  connection.query('DELETE FROM Autor WHERE CNPJ = ?', [CNPJ], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Autor deletado' });
  });
};
