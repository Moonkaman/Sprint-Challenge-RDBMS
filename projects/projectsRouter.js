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

router.post('/', (req, res) => {
  if(req.body.name !== undefined && req.body.completed !== undefined){
    db.post(table, req.body)
      .then(id => {
        db.getProject(id[0])
          .then(newProject => res.status(201).json(newProject))
          .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the new project at this time', error: err}))
      })
      .catch(err => res.status(500).json({errorMessage: 'Could not create a project at this time', error: err}))
  } else {
    res.status(400).json({errorMessage: `Please provide${!req.body.name ? ' a name' : ''}${!req.body.name && req.body.completed === undefined ?' and' : ''}${req.body.completed === undefined ? ' a completed flag.' : ''}`})
  }
})

router.put('/:id', (req, res) => {
  if(req.body.name !== undefined && req.body.completed !== undefined){
    db.update(table, req.params.id, req.body)
      .then(count => {
        if(count > 0) {
          db.getProject(req.params.id)
            .then(project => res.status(200).json(project))
            .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the updated project at this time', error: err}));
        } else {
          res.status(404).json({errorMessage: 'The project you tried to update could not be found.'})
        }
      })
      .catch(err => res.status(500).json({errorMessage: 'Could not update the project with the specified ID at this time', error: err}))
  } else {
    res.status(400).json({errorMessage: `Please provide${!req.body.name ? ' a name' : ''}${!req.body.name && req.body.completed === undefined ?' and' : ''}${req.body.completed === undefined ? ' a completed flag.' : ''}`})
  }
})

module.exports = router;