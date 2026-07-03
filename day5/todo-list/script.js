const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const taskCount = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearBtn");

let tasks = [];

function updateCount() {
  const remainingTasks = tasks.filter(function (task) {
    return !task.completed;
  }).length;

  taskCount.textContent = `${remainingTasks} ${remainingTasks === 1 ? "task" : "tasks"}`;
}

function renderTasks() {
  todoList.innerHTML = "";

  tasks.forEach(function (task) {
    const item = document.createElement("li");
    item.className = task.completed ? "todo-item completed" : "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const text = document.createElement("span");
    text.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.type = "button";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      tasks = tasks.filter(function (currentTask) {
        return currentTask.id !== task.id;
      });
      renderTasks();
    });

    item.append(checkbox, text, deleteBtn);
    todoList.appendChild(item);
  });

  updateCount();
}

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = todoInput.value.trim();

  if (!text) {
    todoInput.focus();
    return;
  }

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  todoInput.value = "";
  todoInput.focus();
  renderTasks();
});

clearBtn.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return !task.completed;
  });
  renderTasks();
});

renderTasks();
