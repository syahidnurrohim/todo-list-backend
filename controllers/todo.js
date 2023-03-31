const Todo = require("../models/todo")

async function getAllTodoItems(req, res) {
  try {
    var opts = {}
    if (req.query.activity_group_id) {
      Object.assign(opts, {
        where: {
          activity_group_id: req.query.activity_group_id
        }
      })
    }

    var todos = await Todo.findAll(opts)

    return res.json({
      status: "Success",
      message: "Success",
      data: todos
    })
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message
    })
  }
}

async function getTodoItem(req, res) {
  try {
    var todo = await Todo.findOne({
      where: {
        todo_id: req.params.todoId
      }
    })
    if (!todo) {
      return res.status(404).json({
        status: "Not Found",
        message: `Todo with ID ${req.params.todoId} Not Found`,
      })
    }

    return res.json({
      status: "Success",
      message: "Success",
      data: todo
    })
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message
    })
  }
}

async function createTodo(req, res) {
  try {
    var required = ['title', 'activity_group_id']
    while (required.length) {
      var prop = required.shift()
      if (!req.body[prop]) {
        return res.status(400).json({
          status: "Bad Request",
          message: `${prop} cannot be null`
        })
      }
    }

    var todo = await Todo.create({
      title: req.body.title || '',
      activity_group_id: req.body.activity_group_id,
      is_active: req.body.is_active || true,
      priority: req.body.priority || 'very-high'
    })

    return res.status(201).json({
      status: "Success",
      message: "Success",
      data: todo
    })
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message
    })
  }
}

async function updateTodo(req, res) {
  var todo = await Todo.findOne({
    where: {
      todo_id: req.params.todoId
    }
  })
  if (!todo) {
    return res.status(404).json({
      status: "Not Found",
      message: `Activity with ID ${req.params.todoId} Not Found`,
    })
  }

  if (req.body.title) {
    todo.title = req.body.title
  }
  if (req.body.priority) {
    todo.priority = req.body.priority
  }
  if ('is_active' in req.body) {
    todo.is_active = Boolean(req.body.is_active)
  }

  await todo.save()

  return res.json({
    status: "Success",
    message: `Success`,
    data: todo
  })
}

async function destroyTodo(req, res) {
  var todo = await Todo.findOne({
    where: {
      todo_id: req.params.todoId
    }
  })
  if (!todo) {
    return res.status(404).json({
      status: "Not Found",
      message: `Todo with ID ${req.params.todoId} Not Found`,
    })
  }
  await todo.destroy()
  return res.json({
    status: "Success",
    message: "Success",
    data: {}
  })
}

module.exports = {
  getAllTodoItems,
  getTodoItem,
  createTodo,
  updateTodo,
  destroyTodo
}