const express = require('express');
const server = express();

// Import routers
const projectRouter = require('./project/router');
const tasksRouter = require('./task/router');
const resourcesRouter = require('./resource/router');

// Setup
server.use(express.json());

// Error handling middleware
server.use("*", (err, req, res, next) => {
  console.error(err);
  next();
});

// Initialize routers
server.use('/api/tasks', tasksRouter);
server.use('/api/projects', projectRouter);
server.use('/api/resources', resourcesRouter);

module.exports = server;
