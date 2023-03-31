const { Model, Sequelize, DataTypes } = require('sequelize')
const sequelize = require("../config/database")

class Todo extends Model {}

Todo.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'todo_id'
  },
  activity_group_id: {
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
  },
  priority: {
    type: DataTypes.STRING
  },
  is_active: {
    type: DataTypes.BOOLEAN
  }
}, {
  sequelize,
  tableName: 'todos',
  modelName: 'Todo',
})

module.exports = Todo