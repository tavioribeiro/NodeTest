const Sequelize = require('sequelize');
const database = require('../db.js');

const Stock = database.define('Stock', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
});

module.exports = Stock;
