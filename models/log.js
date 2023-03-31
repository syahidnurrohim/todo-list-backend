const { Model, Sequelize, DataTypes } = require('sequelize')
const sequelize = require("../config/database")

class Log extends Model {}

Log.init({
  ip_addr: {
    type: DataTypes.STRING,
  },
  user_agent: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  payload: {
    type: DataTypes.STRING
  },
  path: {
    type: DataTypes.STRING
  },
  method: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  tableName: 'logs',
  modelName: 'Log',
})

module.exports = Log