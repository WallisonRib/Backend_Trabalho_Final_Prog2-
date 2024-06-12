const connection = require('../config/database');

exports.createGenero = (req, res) => {
  const { Nome } = req.body;
  const query = 'INSERT INTO Genero (Nome) VALUES ($1)';

  connection.query(query, [Nome], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ codG: result.insertId, Nome });
  });
};

exports.getGeneros = (req, res) => {
  connection.query('SELECT * FROM Genero', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results.rows);
  });
};

exports.updateGenero = (req, res) => {
  const { codG } = req.params;
  const { Nome } = req.body;
  const query = 'UPDATE Genero SET Nome = $1 WHERE codG = $2';

  connection.query(query, [Nome, codG], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ codG, Nome });
  });
};

exports.deleteGenero = (req, res) => {
  const { codG } = req.params;
  const query = 'DELETE FROM Genero WHERE codG = $1';

  connection.query(query, [codG], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Genero deletado' });
  });
};
