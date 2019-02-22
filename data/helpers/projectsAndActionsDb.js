const db = require('../dbConfig');

module.exports = {
  getProject,
}

function getProject(id) {
  return db('projects').where({id: id}).first()
    .then(project => {
      return db('actions').where({project_id: id})
        .then(actions => {
          return {...project, actions}
        })
    })
}

