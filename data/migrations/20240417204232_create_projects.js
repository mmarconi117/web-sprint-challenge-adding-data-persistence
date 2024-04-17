exports.up = async function(knex) {
    await knex.schema
      .createTable("projects", function(table) {
        table.increments("project_id"); // Primary key
        table.string("project_name").notNullable(); // Required column
        table.text("project_description"); // Optional column
        table.boolean("project_completed").defaultTo(false); // Defaults to false if not provided
      })
      .createTable("resources", function(table) {
        table.increments("resource_id"); // Primary key
        table.string("resource_name").notNullable(); // Required column
        table.string("resource_description"); // Optional column
      })
      .createTable("tasks", function(table) {
        table.increments("task_id"); // Primary key
        table.text("task_description").notNullable(); // Required column
        table.text("task_notes"); // Optional column
        table.boolean("task_completed").defaultTo(false); // Defaults to false if not provided
        table.integer("project_id")
          .unsigned()
          .notNullable()
          .references("project_id")
          .inTable("projects"); // Foreign key referencing projects
      })
      .createTable("project_resources", function(table) {
        table.increments("project_resource_id"); // Primary key
        table.integer("project_id")
          .unsigned()
          .notNullable()
          .references("project_id")
          .inTable("projects"); // Foreign key referencing projects
        table.integer("resource_id")
          .unsigned()
          .notNullable()
          .references("resource_id")
          .inTable("resources"); // Foreign key referencing resources
        table.unique(["project_id", "resource_id"]); // Ensure uniqueness of resource assignment
      });
  };

  exports.down = async function(knex) {
    await knex.schema
      .dropTableIfExists("project_resources")
      .dropTableIfExists("tasks")
      .dropTableIfExists("resources")
      .dropTableIfExists("projects");
  };
