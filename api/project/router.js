const express = require('express')
const db = require('./model')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const projects = await db.find();

    const formattedProjects = projects.map(project => ({
      ...project,
      project_completed: !!project.project_completed
    }));

    res.status(200).json(formattedProjects);
  } catch (error) {
    next(error);
  }
});


router.get('/:id', checkForProject(), (req, res, next) => {
  db.findById(req.params.id)
  .then(project => res.status(200).json(project))
  .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  const newProject = {
    ...req.body,
    project_completed: !!req.body.project_completed // Convert to boolean
  };

  db.add(newProject)
    .then(() => {
      res.status(201).json(newProject);
    })
    .catch(err => {
      next(err);
    });
});



router.put('/:id', checkForProject(), validateProjectDataReqs(), (req, res, next) => {
  db.update(req.params.id, req.body)
  .then(() => {
    res.status(200).json({message: 'project updated successfully'})
  })
  .catch(err => next(err))
})

router.delete('/:id', checkForProject(), (req, res, next) => {
  db.remove(req.params.id)
  .then(() => {
    res.status(200).json({message: 'project deleted'})
  })
  .catch(err => next(err))
})

function validateProjectDataReqs() {
  return (req, res, next) => {
    if(!req.body.name) {
      res.status(400).json({error: 'name is a required field'})
    }
    else {
      next()
    }
  }
}

function checkForProject() {
  return (req, res, next) => {
    const requestedProject = db.findById(req.params.id)

    if (requestedProject) {
      next()
    }
    else{
      res.status(404).json({error: 'referenced project not found'})
    }
  }
}

module.exports = router;
