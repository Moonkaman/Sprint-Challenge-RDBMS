const express = require('express');

const db = require('../data/helpers/projectsAndActionsDb');

const router = express.Router();

const table = 'actions';

router.get('/', (req, res) => {
  db.get(table)
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the list of actions at this time', error: err}))
})

router.get('/:id', (req, res) => {
  db.getById(table, req.params.id)
    .then(action => {
      if(action) {
        res.status(200).json(action)
      } else {
        res.status(404).json({errorMessage: 'The action with the specified ID was not found'})
      }
    })
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the action with the specified ID at this time', error: err}))
})

router.post('/', (req, res) => {
  if(req.body.description !== undefined && req.body.completed !== undefined && req.body.project_id !== undefined){
    db.post(table, req.body)
      .then(id => {
        db.getById(table, id[0])
          .then(newAction => res.status(201).json(newAction))
          .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the new action at this time', error: err}))
      })
      .catch(err => res.status(500).json({errorMessage: 'Could not create an action at this time', error: err}))
  } else {
    res.status(400).json({errorMessage: `Please provide${!req.body.description ? ' a description' : ''}${!req.body.description && req.body.completed === undefined || !req.body.description && req.body.project_id === undefined || req.body.project_id === undefined && req.body.completed === undefined  ?' and ' : ''}${req.body.completed === undefined ? ' a completed flag ' : ''}${req.body.completed === undefined && req.body.description === undefined && req.body.project_id === undefined ? 'and ' : ''}${req.body.project_id === undefined ? 'a valid project ID' : ''}.`});
  }
})

router.put('/:id', (req, res) => {
  if(req.body.description !== undefined && req.body.completed !== undefined && req.body.project_id !== undefined){
    db.update(table, req.params.id, req.body)
      .then(count => {
        if(count > 0) {
          db.getById(table, req.params.id)
            .then(action => res.status(200).json(action))
            .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the updated action at this time', error: err}));
        } else {
          res.status(404).json({errorMessage: 'The action you tried to update could not be found.'})
        }
      })
      .catch(err => res.status(500).json({errorMessage: 'Could not update the action with the specified ID at this time', error: err}))
  } else {
    res.status(400).json({errorMessage: `Please provide${!req.body.description ? ' a description' : ''}${!req.body.description && req.body.completed === undefined || !req.body.description && req.body.project_id === undefined || req.body.project_id === undefined && req.body.completed === undefined  ?' and ' : ''}${req.body.completed === undefined ? ' a completed flag ' : ''}${req.body.completed === undefined && req.body.description === undefined && req.body.project_id === undefined ? 'and ' : ''}${req.body.project_id === undefined ? 'a valid project ID' : ''}.`});
  }
})

router.delete('/:id', (req, res) => {
  db.remove(table, req.params.id)
    .then(count => count > 0 ? res.status(204).end() : res.status(404).json({errorMessage: 'The action you tried to delete could not be found.'}))
    .catch(err => res.status(500).json({errorMessage: 'Could not delete the action with the specified id at this time', error: err}))
})

module.exports = router;