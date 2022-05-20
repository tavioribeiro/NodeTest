const Sequelize = require('sequelize');
const database = require('../db.js');

const Pedido = database.define('Pedidos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    observacao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    opcaoDeEntrega: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    clienteFixo: {
        type: Sequelize.STRING,
        allowNull: true
    },
    tipoPagamento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valorTotal: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    valorDesconto: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    valorFinal: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
});

module.exports = Pedido;
