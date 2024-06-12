const connection = require('../config/database');

exports.createGenLivro = (req, res) => {
  const { codG, ISBN } = req.body;
  connection.query('INSERT INTO GenLivro (codG, ISBN) VALUES (?, ?)', [codG, ISBN], (err, result) => {
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
    res.send(results);
  });
};

exports.deleteGenLivro = (req, res) => {
  const { codG, ISBN } = req.body;
  connection.query('DELETE FROM GenLivro WHERE codG = ? AND ISBN = ?', [codG, ISBN], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'GenLivro deletado' });
  });
};
