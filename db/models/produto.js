const Sequelize = require('sequelize');
const database = require('../db.js');

const Produto = database.define('Produtos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
    precoUnidade: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    preco100ml: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    preco210ml: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    preco400ml: {
        type: Sequelize.DOUBLE,
        allowNull: true
    },
    quantidadeDisponivel: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ingredientes: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = Produto;
