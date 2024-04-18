
exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('projects').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('projects').insert([
          {id: 1, project_name: 'first project', project_description:'test 1', project_completed: true},
          {id: 2, project_name: 'second project', project_description:'test 2', project_completed: true},
          {id: 3, project_name: 'third project', project_description:'test 3', project_completed: true},
          {id: 4, project_name: 'fourth project', project_description:'test 4', project_completed: true}
        ]);
      });
  };
