var sequelize = require('sequelize');

var User = Sequelize.define('user', {
    title: sequelize.STRING,
    description: sequelize.TEXT
});