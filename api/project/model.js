const db = require('../../data/dbConfig')

module.exports = {
  find,
  findById,
  add,
  update,
  remove
}

function find() {
  return db('project')
}

function findById(id) {
  return db('project')
  .where('id', id)
  .first()
}

function add(newProject) {
  return db('project')
  .insert(newProject)
}

function update(id, newProject) {
  return db('project')
  .where('id', id)
  .update(newProject)
}

function remove(id) {
  return db('project')
  .where('id', id)
  .del()
}
