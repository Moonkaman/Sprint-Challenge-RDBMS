
exports.up = function(knex, Promise) {
  return knex.schema.createTable('actions', function(t){
    t.increments();
    t.integer('project_id')
      .unsigned()
      .references('id')
      .inTable('projects')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE')
      .notNullable();
      
    t.text('description').notNullable();
    t.text('notes');
    t.boolean('completed').notNullable();
  });
};

exports.down = function(knex, Promise) {
  
};
