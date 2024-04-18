const express = require('express')
const db = require('./model')

const router = express.Router()

router.get('/', (req, res, next) => {
  db.find()
  .then(resources => res.status(200).json(resources))
  .catch(err => next(err))
})

router.get('/:id', checkForResource(), (req, res, next) => {
  db.findById(req.params.id)
  .then(resource => res.status(200).json(resource))
  .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  const newResource = req.body;
  db.add(newResource)
  .then(() => {
    res.status(201).json(newResource)
  })
  .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
  db.update(req.params.id, req.body)
  .then(() => {
    res.status(200).json({message: 'resource updated successfully'})
  })
  .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
  db.remove(req.params.id)
  .then(() => {
    res.status(200).json({message: 'resource deleted'})
  })
  .catch(err => next(err))
})

// function validateResourceDataReqs() {
//   return (req, res, next) => {
//     if(!req.body.name) {
//       res.status(400).json({error: 'name is a required field'})
//     }
//     else { next() }
//   }
// }

function checkForResource() {
  return (req, res, next) => {
    const requestedResource = db.findById(req.params.id)

    if (requestedResource) { next() }
    else {
      res.status(404).json({error: 'referenced resource not found'})
    }
  }
}

module.exports = router
