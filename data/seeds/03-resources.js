exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        { id: 1, resource_name: 'camera', resource_description: null },
        { id: 2, resource_name: 'backdrop', resource_description: 'white' },
        { id: 3, resource_name: 'microphone', resource_description: null },
        { id: 4, resource_name: 'lights', resource_description: null }
      ]);
    });
};
