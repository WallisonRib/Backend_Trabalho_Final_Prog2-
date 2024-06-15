const connection = require('../config/database');

exports.createEditora = (req, res) => {
  const { CNPJ, Nome } = req.body;
  const query = 'INSERT INTO Editora (CNPJ, Nome) VALUES ($1, $2)';

  connection.query(query, [CNPJ, Nome], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ CNPJ, Nome });
  });
};

exports.getEditoras = (req, res) => {
  connection.query('SELECT * FROM Editora', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
};

exports.updateEditora = (req, res) => {
  const { CNPJ } = req.params;
  const { Nome } = req.body;
  const query = 'UPDATE Editora SET Nome = $1 WHERE CNPJ = $2';

  connection.query(query, [Nome, CNPJ], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ CNPJ, Nome });
  });
};

exports.deleteEditora = (req, res) => {
  const { CNPJ } = req.params;
  const query = 'DELETE FROM Editora WHERE CNPJ = $1';

  connection.query(query, [CNPJ], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Editora deletada' });
  });
};
