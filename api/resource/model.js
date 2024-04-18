const db = require('../../data/dbConfig');

function find() {
    return db('resources');
}

function findById(id) {
    return db('resources')
        .where('id', id)
        .first();
}

function add(newResource) {
  return db('resources')
      .insert(newResource)
      .then(ids => {
          // Assuming the database generates an ID for the inserted resource
          const id = ids[0];
          // You can return any relevant information about the inserted resource
          return { id, ...newResource };
      });
}


function update(id, newResource) {
    return db('resources')
        .where('id', id)
        .update(newResource);
}

function remove(id) {
    return db('resources')
        .where('id', id)
        .del();
}

module.exports = {
    find,
    findById,
    add,
    update,
    remove
};
