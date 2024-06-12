const express = require('express');
const router = express.Router();

// Importar controladores
const funcionarioController = require('../controllers/funcionarioController');
const editoraController = require('../controllers/editoraController');
const livroController = require('../controllers/livroController');
const autorController = require('../controllers/autorController');
const autoriaController = require('../controllers/autoriaController');
const generoController = require('../controllers/generoController');
const genLivroController = require('../controllers/genLivroController');

// Rotas CRUD para a tabela Funcionario
router.post('/funcionarios', funcionarioController.createFuncionario);
router.get('/funcionarios', funcionarioController.getFuncionarios);
router.put('/funcionarios/:CPF', funcionarioController.updateFuncionario);
router.delete('/funcionarios/:CPF', funcionarioController.deleteFuncionario);

// Rotas CRUD para a tabela Editora
router.post('/editoras', editoraController.createEditora);
router.get('/editoras', editoraController.getEditoras);
router.put('/editoras/:CNPJ', editoraController.updateEditora);
router.delete('/editoras/:CNPJ', editoraController.deleteEditora);

// Rotas CRUD para a tabela Livro
router.post('/livros', livroController.createLivro);
router.get('/livros', livroController.getLivros);
router.put('/livros/:ISBN', livroController.updateLivro);
router.delete('/livros/:ISBN', livroController.deleteLivro);
router.get('/livros/search', livroController.searchLivros);


// Rotas CRUD para a tabela Autor
router.post('/autores', autorController.createAutor);
router.get('/autores', autorController.getAutores);
router.put('/autores/:CNPJ', autorController.updateAutor);
router.delete('/autores/:CNPJ', autorController.deleteAutor);

// Rotas CRUD para a tabela Autoria
router.post('/autorias', autoriaController.createAutoria);
router.get('/autorias', autoriaController.getAutorias);
router.delete('/autorias', autoriaController.deleteAutoria);

// Rotas CRUD para a tabela Genero
router.post('/generos', generoController.createGenero);
router.get('/generos', generoController.getGeneros);
router.put('/generos/:codG', generoController.updateGenero);
router.delete('/generos/:codG', generoController.deleteGenero);

// Rotas CRUD para a tabela GenLivro
router.post('/genlivros', genLivroController.createGenLivro);
router.get('/genlivros', genLivroController.getGenLivros);
router.delete('/genlivros', genLivroController.deleteGenLivro);

module.exports = router;
