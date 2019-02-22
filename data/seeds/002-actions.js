
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('actions').insert([
        {project_id: 1, description: 'Pick up pencil', notes: 'Use hand to do this', completed: false },
        {project_id: 1, description: 'Do Homework with pencil', notes: 'Use brain to do this', completed: false },
        {project_id: 2, description: 'Find food', notes: 'Try the fridge first and if that doesnt work try pantry', completed: false },
        {project_id: 2, description: 'Eat food', notes: 'Use mouth to do this', completed: false },
        {project_id: 3, description: 'Open book', notes: 'Use hand to do this', completed: false },
        {project_id: 3, description: 'Read book', notes: 'Use eyes to do this', completed: false },
        {project_id: 3, description: 'Get smarter', notes: 'Use brain to do this', completed: false }
      ]);
    });
};
