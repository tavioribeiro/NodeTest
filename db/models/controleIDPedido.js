const Sequelize = require('sequelize');
const database = require('../db.js');

const ControleIDPedido = database.define('Controle ID Pedidos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    letra: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = ControleIDPedido;
