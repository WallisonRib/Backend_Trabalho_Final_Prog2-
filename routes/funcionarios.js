const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

/**
 * @swagger
 * tags:
 *   name: Funcionários
 *   description: Rotas para gerenciamento de funcionários
 */

/**
 * @swagger
 * /api/funcionarios:
 *   post:
 *     summary: Cria um novo funcionário
 *     tags: [Funcionários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               CPF:
 *                 type: string
 *               Nome:
 *                 type: string
 *               Telefone:
 *                 type: string
 *               Email:
 *                 type: string
 *               Cargo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 */
router.post('/funcionarios', funcionarioController.createFuncionario);

/**
 * @swagger
 * /api/funcionarios:
 *   get:
 *     summary: Lista todos os funcionários
 *     tags: [Funcionários]
 *     responses:
 *       200:
 *         description: Lista de funcionários
 */
router.get('/funcionarios', funcionarioController.getFuncionarios);

/**
 * @swagger
 * /api/funcionarios/{CPF}:
 *   put:
 *     summary: Atualiza os dados de um funcionário
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: CPF
 *         required: true
 *         schema:
 *           type: string
 *         description: CPF do funcionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nome:
 *                 type: string
 *               Telefone:
 *                 type: string
 *               Email:
 *                 type: string
 *               Cargo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Funcionário atualizado com sucesso
 *       404:
 *         description: Funcionário não encontrado
 */
router.put('/funcionarios/:CPF', funcionarioController.updateFuncionario);

/**
 * @swagger
 * /api/funcionarios/{CPF}:
 *   delete:
 *     summary: Remove um funcionário pelo CPF
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: CPF
 *         required: true
 *         schema:
 *           type: string
 *         description: CPF do funcionário
 *     responses:
 *       200:
 *         description: Funcionário removido com sucesso
 *       404:
 *         description: Funcionário não encontrado
 */
router.delete('/funcionarios/:CPF', funcionarioController.deleteFuncionario);

module.exports = router;
