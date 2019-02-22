const express = require('express');

const db = require('../data/helpers/projectsAndActionsDb');

const router = express.Router();

const table = 'actions';

router.get('/', (req, res) => {
  db.get(table)
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the list of actions at this time', error: err}))
})

module.exports = router;