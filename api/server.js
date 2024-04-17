const express = require('express');
const router = express.Router();

// Import database functions for interacting with the database
const {
  addResource,
  getResources,
  addProject,
  getProjects,
  addTask,
  getTasks
} = require('../data/dbConfig');

// Define routes using router
// ...

module.exports = router;
