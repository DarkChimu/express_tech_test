const { Sequelize } = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`)

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync()
        console.log('Database has been synced successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

connect()

module.exports = {
    sequelize
}