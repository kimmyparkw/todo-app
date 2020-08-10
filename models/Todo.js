const db = require('../db/config')

class Todo {
  constructor({ id, title, description, status, created_on }) {
    this.id = id || null;
    this.title = title;
    this.description = description;
    this.status = status;
    this.created_on = created_on || null;
  }

  static getAll() {
    return db
    .manyOrNone('SELECT * FROM todos')
    .then((todos) => {
      return todos.map((todo) => {
        return new this(todo)
      })
    })
  }

  static getById(id) {
    return db
      .oneOrNone('SELECT * FROM todos WHERE id = $1', id)
      .then((todo) => {
        if (todo) return new this(todo);
        throw new Error('Todo not found');
      })
  }

  save() {
    return db
    .one(
      `INSERT INTO todos (title, description, status)
      VALUES ($/title/, $/description/, $/status/)
      RETURNING *`,
        this
    )
    .then((todo) => {
      return Object.assign(this, todo)
    })
  }

  update(changes) {
    Object.assign(this, changes)
    return db
    .oneOrNone(
      `UPDATE todos SET
      tite = $/title/
      description = $/description/,
      status = $/status/
      WHERE id = $/id/
      RETURNING *`,
        this
    )
    .then((todo) => {
      return Object.assign(this, todo)}
    )
  }

  delete() {
    return db.none('DELETE FROM todos WHERE id = $/id/', this)
  }
}


module.exports = Todo
