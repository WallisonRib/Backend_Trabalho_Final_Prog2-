const connection = require('../config/database');

exports.createLivro = (req, res) => {
  const { ISBN, Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco } = req.body;
  connection.query('INSERT INTO Livro (ISBN, Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [ISBN, Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ ISBN, Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco });
  });
};

exports.getLivros = (req, res) => {
  connection.query('SELECT * FROM Livro', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
};

exports.updateLivro = (req, res) => {
  const { ISBN } = req.params;
  const { Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco } = req.body;
  connection.query('UPDATE Livro SET Nome = ?, DataPub = ?, Func_Reg = ?, Editora = ?, Data_Reg = ?, Descricao = ?, Foto = ?, LinkMenorPreco = ? WHERE ISBN = ?', [Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco, ISBN], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ ISBN, Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco });
  });
};

exports.deleteLivro = (req, res) => {
  const { ISBN } = req.params;
  connection.query('DELETE FROM Livro WHERE ISBN = ?', [ISBN], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Livro deletado' });
  });
};
