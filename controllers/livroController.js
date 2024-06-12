const connection = require('../config/database');

exports.createLivro = (req, res) => {
  const { ISBN, Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco } = req.body;
  const query = 'INSERT INTO Livro (ISBN, Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

  connection.query(query, [ISBN, Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ ISBN, Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco });
  });
};

exports.getLivros = (req, res) => {
  connection.query(`
    SELECT Livro.*, Autor.Nome AS AutorNome, Genero.Nome AS GeneroNome
    FROM Livro
    LEFT JOIN Autoria ON Livro.ISBN = Autoria.ISBN
    LEFT JOIN Autor ON Autoria.CNPJ = Autor.CNPJ
    LEFT JOIN GenLivro ON Livro.ISBN = GenLivro.ISBN
    LEFT JOIN Genero ON GenLivro.codG = Genero.codG
  `, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
};


exports.updateLivro = (req, res) => {
  const { ISBN } = req.params;
  const { Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco } = req.body;
  const query = 'UPDATE Livro SET Nome = ?, DataPub = ?, Func_Reg = ?, Editora = ?, Data_Reg = ?, Descricao = ?, Foto = ?, LinkMenorPreco = ? WHERE ISBN = ?';

  connection.query(query, [Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco, ISBN], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ ISBN, Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco });
  });
};

exports.deleteLivro = (req, res) => {
  const { ISBN } = req.params;
  const query = 'DELETE FROM Livro WHERE ISBN = ?';

  connection.query(query, [ISBN], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Livro deletado' });
  });
};
