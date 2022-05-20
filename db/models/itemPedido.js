const Sequelize = require('sequelize');
const database = require('../db.js');

const ItemPedido = database.define('Itens Pedidos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
/*     codigo: {
        type: Sequelize.STRING,
        allowNull: false
    }, */
    
    observacao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: true
    },  
    
    variacao: {
        type: Sequelize.STRING,
        allowNull: true
    },
    total: {
        type: Sequelize.DOUBLE,
        allowNull: true
    }
});

module.exports = ItemPedido;
