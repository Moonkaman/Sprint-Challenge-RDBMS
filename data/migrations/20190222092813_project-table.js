
exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', function(t){
    t.increments();
    t.string('name', 128).notNullable();
    t.text('description');
    t.boolean('completed').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('projects');
};
