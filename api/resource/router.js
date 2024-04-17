// build your `/api/resources` router here
// api/projects/resources/router.js

const express = require('express');
const resourceModel = require('./model');

const router = express.Router();

// POST /api/projects/resources
router.post('/', async (req, res) => {
  try {
    const resource = await resourceModel.addResource(req.body);
    res.status(201).json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding resource' });
  }
});

// GET /api/projects/resources
router.get('/', async (req, res) => {
  try {
    const resources = await resourceModel.getResources();
    res.status(200).json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching resources' });
  }
});

// Define more routes as needed for resource operations

module.exports = router;
