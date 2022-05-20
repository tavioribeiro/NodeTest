const Sequelize = require('sequelize');
const database = require('../db.js');

const Categoria = database.define('Categorias', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Categoria;
