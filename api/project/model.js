const db = require('../../data/dbConfig')



function find() {
  return db('projects')
}

function findById(id) {
  return db('projects')
  .where('id', id)
  .first()
}

function add(newProject) {
  return db('projects')
  .insert(newProject)
}

function update(id, newProject) {
  return db('projects')
  .where('id', id)
  .update(newProject)
}

function remove(id) {
  return db('projects')
  .where('id', id)
  .del()
}


module.exports = {
  find,
  findById,
  add,
  update,
  remove
}
