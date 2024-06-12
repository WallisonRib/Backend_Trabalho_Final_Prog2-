const connection = require('../config/database');

exports.createAutoria = (req, res) => {
  const { CNPJ, ISBN } = req.body;
  const query = 'INSERT INTO Autoria (CNPJ, ISBN) VALUES ($1, $2)';

  connection.query(query, [CNPJ, ISBN], (err, result) => {
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
    res.send(results.rows);
  });
};

exports.deleteAutoria = (req, res) => {
  const { CNPJ, ISBN } = req.body;
  const query = 'DELETE FROM Autoria WHERE CNPJ = $1 AND ISBN = $2';

  connection.query(query, [CNPJ, ISBN], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Autoria deletada' });
  });
};
