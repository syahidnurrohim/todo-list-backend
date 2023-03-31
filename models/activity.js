const { Model, Sequelize, DataTypes } = require('sequelize')
const sequelize = require("../config/database")

class Activity extends Model {}

Activity.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'activity_id'
  },
  title: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING
  },
}, {
  sequelize,
  tableName: 'activities',
  modelName: 'Activity',
})

module.exports = Activity