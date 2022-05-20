const Sequelize = require('sequelize');
const database = require('../db.js');

const ClienteFixo = database.define('Clientes Fixos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = ClienteFixo;
