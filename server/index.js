const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const server = express();

const funcionarioRouter = require('./routes/funcionarioRouter');

// Middleware para parsear URL-encoded e JSON
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Rota para funcionários
server.use('/funcionario', funcionarioRouter);

// Configuração do Swagger
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API de Funcionários',
            description: 'Documentação da API de Funcionários',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // Especifique os arquivos que contêm as anotações Swagger
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Credenciais do banco de dados
const DB_USER = 'IgoROweN';
const DB_PASSWORD = encodeURIComponent('SenhaMongoDB1');

// Conexão com o MongoDB
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.c2drv4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
)
    .then(() => {
        console.log('Conectado ao MongoDB!');
    })
    .catch((err) => {
        console.log(err);
    });

// Inicia o servidor
server.listen(3000, () => {
    console.log('Servidor está rodando na porta 3000');
});
