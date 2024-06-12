const connection = require('../config/database');

exports.createGenLivro = (req, res) => {
  const { codG, ISBN } = req.body;
  const query = 'INSERT INTO GenLivro (codG, ISBN) VALUES ($1, $2)';

  connection.query(query, [codG, ISBN], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ codG, ISBN });
  });
};

exports.getGenLivros = (req, res) => {
  connection.query('SELECT * FROM GenLivro', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results.rows);
  });
};

exports.deleteGenLivro = (req, res) => {
  const { codG, ISBN } = req.body;
  const query = 'DELETE FROM GenLivro WHERE codG = $1 AND ISBN = $2';

  connection.query(query, [codG, ISBN], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'GenLivro deletado' });
  });
};
