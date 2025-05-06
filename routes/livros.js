const express = require('express');
const router = express.Router();
const livroController = require('../controllers/LivroController');

/**
 * @swagger
 * tags:
 *   - name: Livros
 *     description: Rotas para gerenciamento de livros
 *   - name: Reviews
 *     description: Rotas para gerenciamento de reviews de livros
 */

/**
 * @swagger
 * /api/livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros
 */
router.get('/livros', livroController.getLivros);

/**
 * @swagger
 * /api/livros:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ISBN:
 *                 type: string
 *               Nome:
 *                 type: string
 *               DataPub:
 *                 type: string
 *                 format: date
 *               Func_Reg:
 *                 type: string
 *               Editora:
 *                 type: string
 *               Data_Reg:
 *                 type: string
 *                 format: date
 *               Descricao:
 *                 type: string
 *               Foto:
 *                 type: string
 *               LinkMenorPreco:
 *                 type: string
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 */
router.post('/livros', livroController.createLivro);

/**
 * @swagger
 * /api/livros/top:
 *   get:
 *     summary: Retorna os 3 livros mais visualizados
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista dos livros mais visualizados
 */
router.get('/livros/top', livroController.getLivrosView);


/**
 * @swagger
 * /api/livros/{isbn}:
 *   get:
 *     summary: Busca um livro pelo ISBN
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: ISBN do livro
 *     responses:
 *       200:
 *         description: Livro encontrado
 *       404:
 *         description: Livro não encontrado
 */
router.get('livros/:isbn', livroController.getLivroByIsbn);


/**
 * @swagger
 * /api/livros/{isbn}:
 *   put:
 *     summary: Atualiza os dados de um livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: ISBN do livro a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nome:
 *                 type: string
 *               DataPub:
 *                 type: string
 *                 format: date
 *               Func_Reg:
 *                 type: string
 *               Editora:
 *                 type: string
 *               Data_Reg:
 *                 type: string
 *                 format: date
 *               Descricao:
 *                 type: string
 *               Foto:
 *                 type: string
 *               LinkMenorPreco:
 *                 type: string
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.put('livros/:isbn', livroController.updateLivro);

/**
 * @swagger
 * /api/livros/{isbn}:
 *   delete:
 *     summary: Remove um livro pelo ISBN
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: ISBN do livro a ser deletado
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.delete('livros/:isbn', livroController.deleteLivro);

/**
 * @swagger
 * /api/livros/{isbn}/reviews:
 *   post:
 *     summary: Cria uma nova review para um livro
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: ISBN do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               AutorReview:
 *                 type: string
 *               NotaReview:
 *                 type: number
 *               TextoReview:
 *                 type: string
 *               DataReview:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Review criada com sucesso
 *       500:
 *         description: Erro ao inserir review
 */
router.post('livros/:isbn/reviews', livroController.createReview);

/**
 * @swagger
 * /api/livros/search:
 *   get:
 *     summary: Busca livros por nome
 *     tags: [Livros]
 *     parameters:
 *       - in: query
 *         name: Nome
 *         schema:
 *           type: string
 *         required: false
 *         description: Nome do livro a ser buscado
 *     responses:
 *       200:
 *         description: Livros encontrados
 */
router.get('/livros/search', livroController.searchLivros);

module.exports = router;
