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

const VALUE_NAMES = {
  STATUS: 'status',
  PRIORITY: 'priority',
}

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

function changeStatus(task, status) {
  const isGivenStatusNotAvailable = !Object.values(STATUSES).includes(status);

  if (isGivenStatusNotAvailable) {
    return null
  }

  list.forEach((_task) => {
    const isTaskFound = _task.name === task;

    if (isTaskFound) {
      _task.status = status;
    }
  })
}

function addTask(task, priority) {
  const lastTaskId = list.splice(list.length, 1).map((_task) => _task.id);
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

function showListBy(byValueName) {
  const variousMeetsToValue = [];

  list.forEach((task) => {
    const isValueNameNotRepeats = !variousMeetsToValue.includes(task[byValueName]);

    if (isValueNameNotRepeats) {
      variousMeetsToValue.push(task[byValueName]);
    };
  });

  variousMeetsToValue.forEach((value) => {
    console.log(
      `${value}:\n${list.map((task) => {
        if (task[byValueName] === value) {
          return `\t${task.name},\n`;
        }
      }).join('')}`
    );
  });
}

export {
  PRIORITIES,
  list,
  addTask,
  deleteTask,
}