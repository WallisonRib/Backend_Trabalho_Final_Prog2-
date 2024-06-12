const connection = require('../config/database');

exports.createEditora = (req, res) => {
  const { CNPJ, Nome } = req.body;
  connection.query('INSERT INTO Editora (CNPJ, Nome) VALUES (?, ?)', [CNPJ, Nome], (err, result) => {
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
  connection.query('UPDATE Editora SET Nome = ? WHERE CNPJ = ?', [Nome, CNPJ], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ CNPJ, Nome });
  });
};

exports.deleteEditora = (req, res) => {
  const { CNPJ } = req.params;
  connection.query('DELETE FROM Editora WHERE CNPJ = ?', [CNPJ], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Editora deletada' });
  });
};
