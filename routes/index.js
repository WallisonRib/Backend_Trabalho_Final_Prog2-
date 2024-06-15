// routes/index.js

const express = require('express');
const router = express.Router();

const funcionarioController = require('../controllers/funcionarioController');
const editoraController = require('../controllers/editoraController');
const livroController = require('../controllers/LivroController');
const autorController = require('../controllers/autorController');
const autoriaController = require('../controllers/autoriaController');
const generoController = require('../controllers/generoController');
const genLivroController = require('../controllers/genLivroController');

// Funcionarios
router.post('/funcionarios', funcionarioController.createFuncionario);
router.get('/funcionarios', funcionarioController.getFuncionarios);
router.put('/funcionarios/:CPF', funcionarioController.updateFuncionario);
router.delete('/funcionarios/:CPF', funcionarioController.deleteFuncionario);

// Editoras
router.post('/editoras', editoraController.createEditora);
router.get('/editoras', editoraController.getEditoras);
router.put('/editoras/:CNPJ', editoraController.updateEditora);
router.delete('/editoras/:CNPJ', editoraController.deleteEditora);

// Livros
router.post('/livros', livroController.createLivro);
router.get('/livros', livroController.getLivros);
router.put('/livros/:ISBN', livroController.updateLivro);
router.delete('/livros/:ISBN', livroController.deleteLivro);
router.get('/livros/search', livroController.searchLivros);
router.get('/livros/:isbn', livroController.getLivroByIsbn);

// Autores
router.post('/autores', autorController.createAutor);
router.get('/autores', autorController.getAutores);
router.put('/autores/:CNPJ', autorController.updateAutor);
router.delete('/autores/:CNPJ', autorController.deleteAutor);

// Autorias
router.post('/autorias', autoriaController.createAutoria);
router.get('/autorias', autoriaController.getAutorias);
router.delete('/autorias', autoriaController.deleteAutoria);

// Generos
router.post('/generos', generoController.createGenero);
router.get('/generos', generoController.getGeneros);
router.put('/generos/:codG', generoController.updateGenero);
router.delete('/generos/:codG', generoController.deleteGenero);

// GenLivros
router.post('/genlivros', genLivroController.createGenLivro);
router.get('/genlivros', genLivroController.getGenLivros);
router.delete('/genlivros', genLivroController.deleteGenLivro);

module.exports = router;
