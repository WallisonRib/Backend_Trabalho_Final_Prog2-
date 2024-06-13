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

exports.searchLivros = (req, res) => {
  const { query } = req.query; // Parâmetro de busca fornecido na consulta
  const searchQuery = `%${query}%`; // Adiciona % para procurar o termo em qualquer posição
  const lowerQuery = query.toLowerCase(); // Converter para minúsculas

  connection.query(`
    SELECT Livro.*, Autor.Nome AS AutorNome, Genero.Nome AS GeneroNome
    FROM Livro
    LEFT JOIN Autoria ON Livro.ISBN = Autoria.ISBN
    LEFT JOIN Autor ON Autoria.CNPJ = Autor.CNPJ
    LEFT JOIN GenLivro ON Livro.ISBN = GenLivro.ISBN
    LEFT JOIN Genero ON GenLivro.codG = Genero.codG
    WHERE Livro.ISBN LIKE $1 
      OR LOWER(Livro.Nome) LIKE $2 
      OR LOWER(Livro.Descricao) LIKE $3 
      OR EXISTS (SELECT 1 FROM Autoria WHERE Livro.ISBN = Autoria.ISBN AND LOWER(Autor.Nome) LIKE $4)
      OR EXISTS (SELECT 1 FROM GenLivro WHERE Livro.ISBN = GenLivro.ISBN AND LOWER(Genero.Nome) LIKE $5)
  `, [searchQuery, `%${lowerQuery}%`, `%${lowerQuery}%`, `%${lowerQuery}%`, `%${lowerQuery}%`], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
};


exports.getLivroByIsbn = async (req, res) => {
  const { isbn } = req.params;
  console.log('ISBN recebido:', isbn); // Verifica se o ISBN está sendo recebido corretamente

  try {
      const query = 'SELECT * FROM Livro WHERE ISBN = $1';
      const result = await connection.query(query, [isbn]);
      console.log('Resultado da consulta:', result.rows); // Verifica o resultado da consulta

      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'Livro não encontrado' });
      }

      res.json(result.rows[0]); // Retorna o primeiro livro encontrado
  } catch (error) {
      console.error('Erro ao buscar livro por ISBN:', error);
      res.status(500).json({ message: 'Erro interno ao buscar livro' });
  }
};
