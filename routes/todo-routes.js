const todoRoutes = require('express').Router()
const todoController = require('../controllers/todo-controller')

todoRoutes.get('/', todoController.index)
todoRoutes.post('/', todoController.create)
todoRoutes.get('/add', (req, res) => {[
  res.render('todos/add')
]})

todoRoutes.get('/:id', todoController.show, (req, res) => {
  res.render('todos/show')
})

//edit
todoRoutes.get('/:id/edit', todoController.show, (req, res) => {
  res.render('todos/edit', {
    todo: res.locals.todo,
  })
})

//update
todoRoutes.put('/:id', todoController.update)
//delete
todoRoutes.delete('/:id', todoController.delete)
module.exports = todoRoutes
