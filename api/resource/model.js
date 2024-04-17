// build your `Resource` model here
// api/projects/resources/model.js

const db = require('../../data/dbConfig');

function getResources() {
  return db('resources');
}

function addResource(resourceData) {
  return db('resources').insert(resourceData);
}

// Add more functions as needed for resource operations

module.exports = {
  getResources,
  addResource,
  // Export other functions as needed
};
