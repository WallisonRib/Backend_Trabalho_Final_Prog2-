const connection = require('../config/database');

exports.createGenero = (req, res) => {
  const { Nome } = req.body;
  connection.query('INSERT INTO Genero (Nome) VALUES (?)', [Nome], (err, result) => {
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
    res.send(results);
  });
};

exports.updateGenero = (req, res) => {
  const { codG } = req.params;
  const { Nome } = req.body;
  connection.query('UPDATE Genero SET Nome = ? WHERE codG = ?', [Nome, codG], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ codG, Nome });
  });
};

exports.deleteGenero = (req, res) => {
  const { codG } = req.params;
  connection.query('DELETE FROM Genero WHERE codG = ?', [codG], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Genero deletado' });
  });
};
