const express = require('express')
const router = express.Router()
const {
  ActivityController, TodoController,
} = require('../controllers')
const Log = require('../models/log')

router.use(async function (req, res, next) {
  try {
    await Log.create({
      ip_addr: req.ip,
      user_agent: req.get('User-Agent'),
      payload: JSON.stringify(req.body),
      path: req.path,
      method: req.method
    })
  } catch (err) {
    console.error(err)
  }
  next()
})
// Activity group apis enpoint
router.get('/activity-groups', ActivityController.getAllActivities)
router.get('/activity-groups/:actId', ActivityController.getActivity)
router.post('/activity-groups', ActivityController.createActivity)
router.patch('/activity-groups/:actId', ActivityController.updateActivity)
router.delete('/activity-groups/:actId', ActivityController.destroyActivity)

// Todo items apis enpoint
router.get('/todo-items', TodoController.getAllTodoItems)
router.get('/todo-items/:todoId', TodoController.getTodoItem)
router.post('/todo-items', TodoController.createTodo)
router.patch('/todo-items/:todoId', TodoController.updateTodo)
router.delete('/todo-items/:todoId', TodoController.destroyTodo)

module.exports = router
