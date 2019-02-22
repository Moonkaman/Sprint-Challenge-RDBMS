
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {name: 'Complete Homework', description: 'Gotta get it done', completed: false},
        {name: 'Eat food', description: 'So I dont die', completed: false},
        {name: 'Study', description: 'To become smart', completed: false}
      ]);
    });
};
