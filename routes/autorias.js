const express = require('express');
const router = express.Router();
const autoriaController = require('../controllers/autoriaController');

/**
 * @swagger
 * tags:
 *   name: Autorias
 *   description: Gerenciamento de autorias (ligação entre autores e livros)
 */

/**
 * @swagger
 * /api/autorias:
 *   post:
 *     summary: Cria uma autoria
 *     tags: [Autorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ISBN:
 *                 type: string
 *               CNPJ:
 *                 type: string
 *     responses:
 *       201:
 *         description: Autoria criada com sucesso
 */
router.post('/autorias', autoriaController.createAutoria);

/**
 * @swagger
 * /api/autorias:
 *   get:
 *     summary: Lista todas as autorias
 *     tags: [Autorias]
 *     responses:
 *       200:
 *         description: Lista de autorias
 */
router.get('/autorias', autoriaController.getAutorias);

/**
 * @swagger
 * /api/autorias:
 *   delete:
 *     summary: Deleta uma autoria (necessário passar ISBN e CNPJ no body)
 *     tags: [Autorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ISBN:
 *                 type: string
 *               CNPJ:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autoria deletada com sucesso
 *       404:
 *         description: Autoria não encontrada
 */
router.delete('/autorias', autoriaController.deleteAutoria);

module.exports = router;
