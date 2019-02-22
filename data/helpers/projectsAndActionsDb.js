const db = require('../dbConfig');

module.exports = {
  getProject,
  get,
  getById,
  post
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

function get(table) {
  return db(table);
}

function getById(table, id) {
  return db(table).where({id: id});
}

function post(table, item) {
  return db(table).insert(item)
    .then(id => db.getById(table, id[0]))
}

