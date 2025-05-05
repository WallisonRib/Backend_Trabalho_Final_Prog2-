const express = require('express');
const router = express.Router();
const editoraController = require('../controllers/editoraController');

/**
 * @swagger
 * tags:
 *   name: Editoras
 *   description: Rotas para gerenciamento de editoras
 */

/**
 * @swagger
 * /api/editoras:
 *   post:
 *     summary: Cria uma nova editora
 *     tags: [Editoras]
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
 *               Endereco:
 *                 type: string
 *     responses:
 *       201:
 *         description: Editora criada com sucesso
 */
router.post('/editoras', editoraController.createEditora);

/**
 * @swagger
 * /api/editoras:
 *   get:
 *     summary: Lista todas as editoras
 *     tags: [Editoras]
 *     responses:
 *       200:
 *         description: Lista de editoras
 */
router.get('/editoras', editoraController.getEditoras);

/**
 * @swagger
 * /api/editoras/{CNPJ}:
 *   put:
 *     summary: Atualiza uma editora pelo CNPJ
 *     tags: [Editoras]
 *     parameters:
 *       - in: path
 *         name: CNPJ
 *         required: true
 *         schema:
 *           type: string
 *         description: CNPJ da editora a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nome:
 *                 type: string
 *               Endereco:
 *                 type: string
 *     responses:
 *       200:
 *         description: Editora atualizada com sucesso
 *       404:
 *         description: Editora não encontrada
 */
router.put('/editoras/:CNPJ', editoraController.updateEditora);

/**
 * @swagger
 * /api/editoras/{CNPJ}:
 *   delete:
 *     summary: Deleta uma editora pelo CNPJ
 *     tags: [Editoras]
 *     parameters:
 *       - in: path
 *         name: CNPJ
 *         required: true
 *         schema:
 *           type: string
 *         description: CNPJ da editora a ser deletada
 *     responses:
 *       200:
 *         description: Editora deletada com sucesso
 *       404:
 *         description: Editora não encontrada
 */
router.delete('/editoras/:CNPJ', editoraController.deleteEditora);

module.exports = router;
