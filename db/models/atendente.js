const Sequelize = require('sequelize');
const database = require('../db.js');

const Atendente = database.define('Atendentes', {
    nome: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    /* telefone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    }, */
});

module.exports = Atendente;
