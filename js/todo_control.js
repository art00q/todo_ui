'use strict'

const STATUSES = {
  TODO: 'TODO',
  INPROGRESS: 'INPROGRESS',
  DONE: 'DONE',
};

const PRIORITIES = {
  LOW: 'low',
  HIGH: 'high',
};

const list = [
  {
    id: 1,
    name: 'create a post',
    status: 'TODO',
    priority: 'low',
  },
  {
    id: 2,
    name: 'test',
    status: 'DONE',
    priority: 'high',
  }
];

function addTask(task, priority) {
  const lastTaskId = list[list.length - 1].id + 1;
  const isGivenPriorityExist = Object.values(PRIORITIES).includes(priority);

  if (isGivenPriorityExist) {
    list.push(
      {
        id: lastTaskId,
        name: task,
        status: STATUSES.TODO,
        priority,
      }
    )
  }
}

function deleteTask(task) {
  for (let i = 0; i < list.length - 1; i++) {
    const isTaskNameMeetsGiven = list[i].name === task;

    if (isTaskNameMeetsGiven) {
      const listCopy = list.slice(0, i).concat(list.slice(i + 1, list.length));

      list.length = 0;
      list.push(...listCopy);
      break
    }
  }
}

export {
  PRIORITIES,
  list,
  addTask,
  deleteTask,
}