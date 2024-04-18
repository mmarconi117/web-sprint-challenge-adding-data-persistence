exports.up = function(knex) {
  return knex.schema.createTable('tasks', tbl => {
    tbl.increments();
    tbl.integer('project_id')
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE')
      .onDelete('SET NULL')
      .notNullable();
    tbl.string('task_description').notNullable();
    tbl.string('task_notes');
    tbl.boolean('task_completed').defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tasks');
};
