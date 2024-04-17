// build your `Task` model here
// api/projects/tasks/model.js

const db = require('../../data/dbConfig');

function getTasks() {
  return db('tasks')
    .join('projects', 'tasks.project_id', 'projects.project_id')
    .select(
      'tasks.task_id',
      'tasks.task_description',
      'tasks.task_notes',
      'tasks.task_completed',
      'projects.project_name',
      'projects.project_description'
    );
}

function addTask(taskData) {
  return db('tasks').insert(taskData);
}

// Add more functions as needed for task operations

module.exports = {
  getTasks,
  addTask,
  // Export other functions as needed
};
