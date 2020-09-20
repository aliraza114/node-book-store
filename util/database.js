const Sequelize = require('sequelize')

const sequelize = new Sequelize('book_store', 'root', '', {
    dialect: 'mysql',
    host: '127.0.0.1'
})

module.exports = sequelize