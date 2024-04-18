const express = require('express');
const db = require('./model');
const projectDb = require('../project/model');
const Task = require('../task/model'); // Import Task model

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const tasks = await db.find();

    // Map over the tasks to format the response as expected by the tests
    const formattedTasks = tasks.map(task => ({
      task_id: task.task_id,
      task_description: task.task_description,
      task_notes: task.task_notes,
      task_completed: !!task.task_completed, // Convert to boolean
      project_name: task.project_name,
      project_description: task.project_description
    }));

    res.status(200).json(formattedTasks);
  } catch (error) {
    next(error);
  }
});

// GET specific task by project ID and task ID
router.get('/:projectId/tasks/:id', async (req, res, next) => {
  try {
    const task = await db.findById(req.params.projectId, req.params.id);

    // Convert task_completed to boolean
    const formattedTask = {
      task_id: task.task_id,
      task_description: task.task_description,
      task_notes: task.task_notes,
      task_completed: !!task.task_completed, // Convert to boolean
      project_name: task.project_name,
      project_description: task.project_description
    };

    res.status(200).json(formattedTask);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const { task_description, task_notes, task_completed, project_id } = req.body;

    // Check if all required fields are present
    if (!task_description || !project_id) {
      return res.status(400).json({ error: 'Task description and project ID are required' });
    }

    // Convert boolean task_completed to integer for storage in the database
    const newTaskId = await db.add({
      task_description,
      task_notes,
      task_completed: task_completed ? 1 : 0, // Convert boolean to integer
      project_id
    });

    // Retrieve the newly created task using its ID
    const newTask = await db.findById(project_id, newTaskId);

    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message }); // Return the error message dynamically
  }
});





module.exports = router;
