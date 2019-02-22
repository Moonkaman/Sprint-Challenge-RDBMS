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

module.exports = router;