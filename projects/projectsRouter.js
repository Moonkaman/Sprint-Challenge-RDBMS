const express = require('express');

const db = require('../data/helpers/projectsAndActionsDb');

const router = express.Router();

router.get('/:id', (req, res) => {
  db.getProject(req.params.id)
    .then(project => res.status(200).json(project))
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the project with the specified ID at this time', error: err}))
})

module.exports = router;