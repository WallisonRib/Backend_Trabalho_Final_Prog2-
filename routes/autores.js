const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');

/**
 * @swagger
 * tags:
 *   name: Autores
 *   description: Rotas para gerenciamento de autores
 */

/**
 * @swagger
 * /api/autores:
 *   post:
 *     summary: Cria um novo autor
 *     tags: [Autores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CNPJ:
 *                 type: string
 *               Nome:
 *                 type: string
 *               Nacionalidade:
 *                 type: string
 *     responses:
 *       201:
 *         description: Autor criado com sucesso
 */
router.post('/autores', autorController.createAutor);

/**
 * @swagger
 * /api/autores:
 *   get:
 *     summary: Lista todos os autores
 *     tags: [Autores]
 *     responses:
 *       200:
 *         description: Lista de autores
 */
router.get('/autores', autorController.getAutores);

/**
 * @swagger
 * /api/autores/{CNPJ}:
 *   put:
 *     summary: Atualiza um autor pelo CNPJ
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: CNPJ
 *         required: true
 *         schema:
 *           type: string
 *         description: CNPJ do autor a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nome:
 *                 type: string
 *               Nacionalidade:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autor atualizado com sucesso
 *       404:
 *         description: Autor não encontrado
 */
router.put('/autores/:CNPJ', autorController.updateAutor);

/**
 * @swagger
 * /api/autores/{CNPJ}:
 *   delete:
 *     summary: Deleta um autor pelo CNPJ
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: CNPJ
 *         required: true
 *         schema:
 *           type: string
 *         description: CNPJ do autor a ser deletado
 *     responses:
 *       200:
 *         description: Autor deletado com sucesso
 *       404:
 *         description: Autor não encontrado
 */
router.delete('/autores/:CNPJ', autorController.deleteAutor);

module.exports = router;
