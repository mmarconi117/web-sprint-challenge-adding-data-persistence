
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('tasks').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('tasks').insert([
          {id: 1, project_id: 1, task_description: 'first task desc for first project', task_notes: 'porp', task_completed: false},
          {id: 2, project_id: 3, task_description: 'another project task', task_notes: 'plurp', task_completed: false},
          {id: 3, project_id: 3, task_description: 'last task for third project', task_notes: 'paropidypoop',task_completed: false}
        ]);
      });
  };
