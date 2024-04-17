// build your `/api/projects` router here
// api/projects/router.js

const express = require('express');
const projectModel = require('./model');

const router = express.Router();

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await projectModel.getProjects();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

// POST /api/projects
router.post('/', async (req, res) => {
  try {
    const project = await projectModel.addProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding project' });
  }
});

// Define more routes as needed for project operations

module.exports = router;
