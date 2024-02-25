import { 
  deleteTask,
  list,
  PRIORITIES,
} from "./todo_control.js";
import { getTasksByPriorities } from "./script.js";

const UI_ELEMENTS = {
  FORMS: document.querySelectorAll('.input'),
  TASKS_LIST: document.querySelectorAll('.tasks'),
  PRIORITY_LIST: document.querySelectorAll('[data-priority]'),
  DELETE_BUTTONS: document.querySelectorAll('.task__delete'),
  CHECKBOXES: document.querySelectorAll('.task__checkbox'),
};

function createUiTask(text) {
  const task = document.createElement('div');

  const checkbox = document.createElement('label');
  const checkboxButton = document.createElement('input');

  checkboxButton.type = 'checkbox'
  checkboxButton.classList = 'checkbox';
  checkboxButton.onclick = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      task.classList.add('task__checked');

      task.parentElement.append(task);
    } else {
      task.classList.remove('task__checked');

      task.parentElement.prepend(task);
    }
  }

  checkbox.classList = 'task__checkbox';
  checkbox.append(checkboxButton);

  const taskText = document.createElement('p');

  taskText.classList = 'task__text text';
  taskText.append(text);

  const deleteButton = document.createElement('span');

  deleteButton.classList = 'task__delete';
  deleteButton.onclick = (event) => {
    event.target.parentElement.remove();

    deleteTask(taskText.textContent);
  }

  task.classList = 'task';
  task.append(checkbox, taskText, deleteButton);

  return task
};

function renderTasksList() {
  const tasksByPriorities = getTasksByPriorities();

  UI_ELEMENTS.PRIORITY_LIST.forEach((elem) => {
    const taskElements = elem.querySelector('.tasks');

    const priorityValue = tasksByPriorities[elem.dataset.priority].name;
    const tasks = tasksByPriorities[priorityValue].tasks;

    tasks.forEach((task) => {
      taskElements.append(createUiTask(task.name));
    });
  });
};

export {
  UI_ELEMENTS,
  createUiTask,
  renderTasksList,
}