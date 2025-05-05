const express = require('express');
const router = express.Router();
const genLivroController = require('../controllers/genLivroController');

/**
 * @swagger
 * tags:
 *   name: GenLivros
 *   description: Associação entre gêneros e livros
 */

/**
 * @swagger
 * /api/genlivros:
 *   post:
 *     summary: Cria uma associação entre livro e gênero
 *     tags: [GenLivros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ISBN:
 *                 type: string
 *               codG:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Associação criada com sucesso
 */
router.post('/genlivros', genLivroController.createGenLivro);

/**
 * @swagger
 * /api/genlivros:
 *   get:
 *     summary: Lista todas as associações entre livros e gêneros
 *     tags: [GenLivros]
 *     responses:
 *       200:
 *         description: Lista de associações
 */
router.get('/genlivros', genLivroController.getGenLivros);

/**
 * @swagger
 * /api/genlivros:
 *   delete:
 *     summary: Remove uma associação entre livro e gênero (passar ISBN e codG no body)
 *     tags: [GenLivros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ISBN:
 *                 type: string
 *               codG:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Associação removida com sucesso
 *       404:
 *         description: Associação não encontrada
 */
router.delete('/genlivros', genLivroController.deleteGenLivro);

module.exports = router;
