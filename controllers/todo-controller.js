const Todo = require('../models/Todo')

const todoController = {

  index(req, res, next) {
    Todo.getAll()
    .then((todos) => {
      res.render('todos/index', {
        todos
      })
    })
    .catch((err) => next(err))
  },

  show(req, res, next) {
    Todo.getById(req.params.id)
    .then((todo) => {
      res.locals.todo = todo
      next()
    })
    .catch((err) => next(err))
  },

  create(req, res, next) {
    new Todo({
      description: req.body.description,
      completed: req.body.completed,
    })
    .save()
    .then((todo) => {
      res.redirect(`/todo/${todo.id}`)
    })
    .catch((err) => next(err))
  },

  update(req, res, next) {
    Todo.getById(req.params.id)
    .then((todo) => {
      return todo.update(req.body)
    })
    .then((updatedTodo) => {
      res.redirect(`/todo/${updatedTodo.id}`)
    })
    .catch((err) => next(err))
  },

  delete(req, res, next) {
    Todo.getById(req.params.id)
    .then((todo) => {
      return todo.delete()
    })
    .then(() => {
      res.json({
        message: 'Deleted successfully'
      })
    })
    .catch((err) => next(err))
  }
}









module.exports = todoController
