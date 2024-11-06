const connection = require('../config/database');

exports.createLivro = (req, res) => { //Query para isnerção de dados no banco de dados
  const { ISBN, Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco } = req.body;

  const query = `
      INSERT INTO Livro (
        ISBN, 
        Nome, 
        DataPub, 
        Func_Reg, 
        Editora, 
        Data_Reg, 
        Descricao, 
        Foto, 
        LinkMenorPreco
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      )
    `;
  connection.query(query, [
    ISBN, Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco
  ], (err, result) => {
    if (err) {
      console.error('Erro ao inserir livro:', err);
      return res.status(500).send('Erro ao inserir livro');
    }
    res.sendStatus(200);
  });
};

exports.getLivros = (req, res) => {
  connection.query(`
      SELECT Livro.*, 
            Autor.Nome AS AutorNome, 
            Genero.Nome AS GeneroNome,
            reviews.AutorReview, 
            reviews.NotaReview, 
            reviews.TextoReview
      FROM Livro
      LEFT JOIN Autoria ON Livro.ISBN = Autoria.ISBN
      LEFT JOIN Autor ON Autoria.CNPJ = Autor.CNPJ
      LEFT JOIN GenLivro ON Livro.ISBN = GenLivro.ISBN
      LEFT JOIN Genero ON GenLivro.codG = Genero.codG
      LEFT JOIN reviews ON Livro.ISBN = reviews.ISBN
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

  const query = `
      UPDATE Livro 
      SET 
        Nome = $1, 
        DataPub = $2, 
        Func_Reg = $3, 
        Editora = $4, 
        Data_Reg = $5, 
        Descricao = $6, 
        Foto = $7, 
        LinkMenorPreco = $8 
      WHERE ISBN = $9
    `;
  const values = [Nome, DataPub, Func_Reg, Editora, Data_Reg, Descricao, Foto, LinkMenorPreco, ISBN];
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar livro:', err);
      return res.status(500).send('Erro ao atualizar livro');
    }

    res.sendStatus(200);
  });
};

exports.deleteLivro = (req, res) => {
  const { ISBN } = req.params;
  const query = 'DELETE FROM Livro WHERE ISBN = $1';

  pool.query(query, [ISBN], (err, result) => {
    if (err) {
      console.error('Erro ao deletar livro:', err);
      return res.status(500).send('Erro ao deletar livro');
    }
    res.send({ message: 'Livro deletado' });
  });
};
exports.searchLivros = (req, res) => {
  const { query } = req.query; // Parâmetro de busca fornecido na consulta
  const searchQuery = `%${query}%`; // Adiciona % para procurar o termo em qualquer posição
  const lowerQuery = query.toLowerCase(); // Converter para minúsculas

  connection.query(`
      SELECT DISTINCT ON (Livro.ISBN) Livro.*, 
            Autor.Nome AS AutorNome, 
            Editora.Nome AS EditoraNome, 
            Genero.Nome AS GeneroNome
      FROM Livro
      LEFT JOIN Autoria ON Livro.ISBN = Autoria.ISBN
      LEFT JOIN Autor ON Autoria.CNPJ = Autor.CNPJ
      LEFT JOIN GenLivro ON Livro.ISBN = GenLivro.ISBN
      LEFT JOIN Genero ON GenLivro.codG = Genero.codG
      LEFT JOIN Editora ON Livro.Editora = Editora.CNPJ
      WHERE Livro.ISBN LIKE $1 
        OR LOWER(Livro.Nome) LIKE $2 
        OR LOWER(Livro.Descricao) LIKE $3 
        OR LOWER(Autor.Nome) LIKE $4
        OR LOWER(Genero.Nome) LIKE $5
        OR LOWER(Editora.Nome) LIKE $6
    `, [searchQuery, `%${lowerQuery}%`, `%${lowerQuery}%`, `%${lowerQuery}%`, `%${lowerQuery}%`, `%${lowerQuery}%`], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results); // Certifique-se de que você está retornando os dados corretamente
  });
};


exports.getLivroByIsbn = async (req, res) => {
  const { isbn } = req.params;
  try {
    const query = `
            SELECT Livro.*, 
                  Autor.Nome AS autor, 
                  Editora.Nome AS editora,
                  COALESCE(json_agg(
                      json_build_object(
                          'AutorReview', reviews.AutorReview,
                          'NotaReview', reviews.NotaReview,
                          'TextoReview', reviews.TextoReview,
                          'DataReview' , review_date

                      )
                  ) FILTER (WHERE reviews.review_id IS NOT NULL), '[]') AS reviews
            FROM Livro
            LEFT JOIN Autoria ON Livro.ISBN = Autoria.ISBN
            LEFT JOIN Autor ON Autoria.CNPJ = Autor.CNPJ
            LEFT JOIN Editora ON Livro.Editora = Editora.CNPJ
            LEFT JOIN reviews ON Livro.ISBN = reviews.ISBN
            WHERE Livro.ISBN = $1
            GROUP BY Livro.ISBN, Autor.Nome, Editora.Nome
        `;
    const result = await connection.query(query, [isbn]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar livro por ISBN:', error);
    res.status(500).json({ message: 'Erro interno ao buscar livro' });
  }
};
exports.createReview = async (req, res) => {
  const { isbn } = req.params;  // Obtém o ISBN da URL (parâmetro)
  const { AutorReview, NotaReview, TextoReview, DataReview } = req.body;  // Obtém os dados da avaliação

  const query = `
    INSERT INTO reviews (ISBN, AutorReview, NotaReview, TextoReview, Review_Date)
    VALUES ($1, $2, $3, $4, $5)
  `;

  const values = [isbn, AutorReview, NotaReview, TextoReview, DataReview];  // Passa os valores para a query

  // Executa a query no banco de dados
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir review:', err);  // Exibe o erro no console
      return res.status(500).send('Erro ao inserir review');  // Retorna erro para o cliente
    }
    res.status(201).send('Review criada com sucesso');  // Retorna resposta positiva ao cliente
  });
};


exports.getLivrosView = (req, res) => {
  connection.query(`
    SELECT * FROM AVG_RATING;

  `, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
};
