const express = require('express');

const db = require('../data/helpers/projectsAndActionsDb');

const router = express.Router();

const table = 'projects';

router.get('/:id', (req, res) => {
  db.getProject(req.params.id)
    .then(project => {
      if(project.id) {
        res.status(200).json(project)
      } else {
        res.status(404).json({errorMessage: 'The project with the specified ID was not found'})
      }
    })
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the project with the specified ID at this time', error: err}))
})

router.get('/', (req, res) => {
  db.get(table)
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the list of projects at this time', error: err}))
})

module.exports = router;