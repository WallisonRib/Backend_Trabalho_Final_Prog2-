const express = require('express');
const router = express.Router();

// Importações de todos os arquivos de rota
const livrosRoutes = require('./livros');
const funcionariosRoutes = require('./funcionarios');
const editorasRoutes = require('./editoras');
const autoresRoutes = require('./autores');
const autoriasRoutes = require('./autorias');
const generosRoutes = require('./generos');
const genLivrosRoutes = require('./genLivros');

// Agrupamento dos prefixos da API
router.use('/', livrosRoutes);         // /api/livros e suas rotas (inclui /top e /:isbn)
router.use('/', funcionariosRoutes);          // /api/funcionarios
router.use('/', editorasRoutes);              // /api/editoras
router.use('/', autoresRoutes);               // /api/autores
router.use('/', autoriasRoutes);              // /api/autorias
router.use('/', generosRoutes);               // /api/generos
router.use('/', genLivrosRoutes);             // /api/genlivros

module.exports = router;
