const connection = require('../config/database');

exports.createAutoria = (req, res) => {
  const { CNPJ, ISBN } = req.body;
  connection.query('INSERT INTO Autoria (CNPJ, ISBN) VALUES (?, ?)', [CNPJ, ISBN], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ CNPJ, ISBN });
  });
};

exports.getAutorias = (req, res) => {
  connection.query('SELECT * FROM Autoria', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
};

exports.deleteAutoria = (req, res) => {
  const { CNPJ, ISBN } = req.body;
  connection.query('DELETE FROM Autoria WHERE CNPJ = ? AND ISBN = ?', [CNPJ, ISBN], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Autoria deletada' });
  });
};
