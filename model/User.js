const connection = require('../config/database')
const { DataTypes } = require('sequelize');
const Date = require('./Date')

const { sequelize } = connection

const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {

});

User.hasMany(Date, {as: 'Dates', foreignKey: 'user_id' })

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User;