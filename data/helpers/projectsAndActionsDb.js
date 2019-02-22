const db = require('../dbConfig');

module.exports = {
  getProject,
  get,
  getById,
  post,
  update,
  remove
}

function getProject(id) {
  console.log(id)
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
  return db(table).where({id: id}).first();
}

function post(table, item) {
  return db(table).insert(item);
}

function update(table, id, item) {
  return db(table).where({id: id}).update(item);
}

function remove(table, id) {
  return db(table).where({id: id}).del();
}

