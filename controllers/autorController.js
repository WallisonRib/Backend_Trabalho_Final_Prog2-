const connection = require('../config/database');

exports.createAutor = (req, res) => {
  const { CNPJ, Nome } = req.body;
  const query = 'INSERT INTO Autor (CNPJ, Nome) VALUES ($1, $2)';

  connection.query(query, [CNPJ, Nome], (err, result) => {
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
    res.send(results.rows);
  });
};

exports.updateAutor = (req, res) => {
  const { CNPJ } = req.params;
  const { Nome } = req.body;
  const query = 'UPDATE Autor SET Nome = $1 WHERE CNPJ = $2';

  connection.query(query, [Nome, CNPJ], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ CNPJ, Nome });
  });
};

exports.deleteAutor = (req, res) => {
  const { CNPJ } = req.params;
  const query = 'DELETE FROM Autor WHERE CNPJ = $1';

  connection.query(query, [CNPJ], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Autor deletado' });
  });
};
