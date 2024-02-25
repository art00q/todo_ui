import { 
  UI_ELEMENTS,
  createUiTask,
  renderTasksList,
} from "./view.js";
import { 
  list,
  addTask,
  deleteTask,
  PRIORITIES,
} from "./todo_control.js";

renderTasksList();

UI_ELEMENTS.FORMS.forEach((elem) => {
  elem.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskText = event.target.firstElementChild.value;
    const tasksList = event.target.nextElementSibling;

    tasksList.prepend(createUiTask(taskText));
  });
});

UI_ELEMENTS.DELETE_BUTTONS.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    event.target.parentElement.remove();
    // console.log(event.target.parentElement);
  });
});

function getTasksByPriorities() {
  const priorities = {
    high: {
      name: 'high',
      tasks: [],
    },
    low: {
      name: 'low',
      tasks: [],
    },
  };

  list.forEach(task => {
    task.priority === PRIORITIES.HIGH ? 
      priorities.high.tasks.push(task) : 
      priorities.low.tasks.push(task);
  });

  return priorities;
}

export {
  getTasksByPriorities,
}