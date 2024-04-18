const db = require('../../data/dbConfig')

module.exports = {
  find,
  findById,
  add,
}

function find(projectId) {
  let query = db('tasks as t')
    .leftJoin('projects as p', 't.project_id', 'p.id')
    .select('t.id', 't.task_description', 't.task_notes', 't.task_completed', 'p.project_name', 'p.project_description');

  if (projectId) {
    query = query.where('t.project_id', projectId);
  }

  return query.then(tasks => {
    // Convert task_completed to boolean
    return tasks.map(task => ({
      ...task,
      task_completed: !!task.task_completed
    }));
  });
}






// MIGHT NEED TO BE TWEAKED
function findById(projectId, id) {
  return db('tasks as task')
    .leftJoin('projects as p', 'task.project_id', 'p.id')
    .where('task.project_id', projectId)
    .where('task.id', id)
    .select('task.project_id', 'p.project_name', 'task.task_description', 'task.task_notes', 'task.task_completed')
    .first()
    .then(task => {
      // Convert task_completed to boolean
      return {
        ...task,
        task_completed: !!task.task_completed
      };
    });
}





async function add({ task_description, task_notes, task_completed, project_id }) {
  const [taskId] = await db('tasks').insert({
    task_description,
    task_notes,
    task_completed,
    project_id // Add project_id to the insertion object
  });

  return taskId;
}
