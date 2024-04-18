
exports.up = function(knex) {
    return knex.schema.createTable('project_resources', tbl => {
      tbl.int('project_id')
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      tbl.int('resource_id')
      .references('id')
      .inTable('resources')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    })
  };

  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('project_resources')
  };
