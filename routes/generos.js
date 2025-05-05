const express = require('express');
const router = express.Router();
const generoController = require('../controllers/generoController');

/**
 * @swagger
 * tags:
 *   name: Gêneros
 *   description: Gerenciamento de gêneros literários
 */

/**
 * @swagger
 * /api/generos:
 *   post:
 *     summary: Cria um novo gênero
 *     tags: [Gêneros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nome:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gênero criado com sucesso
 */
router.post('/generos', generoController.createGenero);

/**
 * @swagger
 * /api/generos:
 *   get:
 *     summary: Lista todos os gêneros
 *     tags: [Gêneros]
 *     responses:
 *       200:
 *         description: Lista de gêneros
 */
router.get('/generos', generoController.getGeneros);

/**
 * @swagger
 * /api/generos/{codG}:
 *   put:
 *     summary: Atualiza um gênero
 *     tags: [Gêneros]
 *     parameters:
 *       - in: path
 *         name: codG
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código do gênero
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gênero atualizado com sucesso
 *       404:
 *         description: Gênero não encontrado
 */
router.put('/generos/:codG', generoController.updateGenero);

/**
 * @swagger
 * /api/generos/{codG}:
 *   delete:
 *     summary: Remove um gênero
 *     tags: [Gêneros]
 *     parameters:
 *       - in: path
 *         name: codG
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código do gênero
 *     responses:
 *       200:
 *         description: Gênero removido com sucesso
 *       404:
 *         description: Gênero não encontrado
 */
router.delete('/generos/:codG', generoController.deleteGenero);

module.exports = router;
