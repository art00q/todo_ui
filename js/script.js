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
import { checkForEmptyString } from "./helpers.js";

renderTasksList();

UI_ELEMENTS.FORMS.forEach((elem) => {
  elem.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskText = event.target.firstElementChild.value;
    const tasksList = event.target.nextElementSibling;
    const priority = event.target.parentElement.dataset.priority;

    if (!checkForEmptyString(taskText)) {
      tasksList.prepend(createUiTask(taskText));
      addTask(taskText, priority);
    }
    
    event.target.reset();
  });
});

UI_ELEMENTS.DELETE_BUTTONS.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    const taskText = event.target.parentElement.querySelector('.task__text').textContent;

    event.target.parentElement.remove();
    deleteTask(taskText);
  });
});

UI_ELEMENTS.CHECKBOXES.forEach((elem) => {
  elem.firstElementChild.addEventListener('click', (event) => {
    const isChecked = event.target.checked;
    const tasksList = elem.parentElement.parentElement;
    const task = elem.parentElement;

    if (isChecked) {
      task.classList.add('task__checked');

      tasksList.append(task);
    } else {
      task.classList.remove('task__checked');

      tasksList.prepend(task);
    }
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