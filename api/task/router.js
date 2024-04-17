// build your `/api/tasks` router here
// api/projects/tasks/router.js

const express = require('express');
const router = express.Router();
const Task = require('./model');

// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const task = await Task.addTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding task' });
  }
});

// GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.getTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

module.exports = router;
