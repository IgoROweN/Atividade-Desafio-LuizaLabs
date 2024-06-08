/**
 * @swagger
 * tags:
 *   name: Funcionários
 *   description: Operações relacionadas aos funcionários
 */

const router = require('express').Router();
const Funcionario = require('../models/Funcionario');

/**
 * @swagger
 * /funcionario:
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
 *               nome:
 *                 type: string
 *               cargo:
 *                 type: string
 *               salario:
 *                 type: number
 *               desligado:
 *                 type: boolean
 *     responses:
 *       '201':
 *         description: Funcionário criado com sucesso
 *       '422':
 *         description: Informar um nome, cargo, salário e estado de desligado é obrigatório
 */
router.post('/', async (req, res) => {
    const { nome, cargo, salario, desligado } = req.body;

    if (!nome || !cargo || !salario || desligado === undefined) {
        return res.status(422).json({ error: 'Informar um nome, cargo, salário e estado de desligado é obrigatório' });
    }

    const funcionario = {
        nome,
        cargo,
        salario,
        desligado,
    };

    try {
        await Funcionario.create(funcionario);
        res.status(201).json({ message: 'Funcionário cadastrado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /funcionario:
 *   get:
 *     summary: Lista todos os funcionários
 *     tags: [Funcionários]
 *     responses:
 *       '200':
 *         description: Lista de funcionários
 */
router.get('/', async (req, res) => {
    try {
        const funcionarios = await Funcionario.find();
        res.status(200).json(funcionarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /funcionario/{id}:
 *   get:
 *     summary: Obtém um funcionário pelo ID
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do funcionário a ser obtido
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Funcionário encontrado
 *       '404':
 *         description: Funcionário não encontrado
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const funcionario = await Funcionario.findById(id);

        if (!funcionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }

        res.status(200).json(funcionario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /funcionario/{id}:
 *   put:
 *     summary: Atualiza um funcionário pelo ID
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do funcionário a ser atualizado
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cargo:
 *                 type: string
 *               salario:
 *                 type: number
 *               desligado:
 *                 type: boolean
 *     responses:
 *       '200':
 *         description: Funcionário atualizado com sucesso
 *       '404':
 *         description: Funcionário não encontrado
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, cargo, salario, desligado } = req.body;

    const funcionario = {
        nome,
        cargo,
        salario,
        desligado,
    };

    try {
        const updatedFuncionario = await Funcionario.findByIdAndUpdate(id, funcionario, { new: true });

        if (!updatedFuncionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }

        res.status(200).json(updatedFuncionario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /funcionario/{id}:
 *   delete:
 *     summary: Deleta um funcionário pelo ID
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do funcionário a ser deletado
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Funcionário deletado com sucesso
 *       '404':
 *         description: Funcionário não encontrado
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFuncionario = await Funcionario.findByIdAndDelete(id);

        if (!deletedFuncionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }

        res.status(200).json({ message: 'Funcionário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
