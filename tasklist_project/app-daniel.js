const form = document.querySelector("#task-form");
const taskList = document.querySelector("ul.collection");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-tasks");


loadEventListeners();

function loadEventListeners() {
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
  document.addEventListener("DOMContentLoaded", loadAndDisplayTasksFromLocalStorage);
}

function loadTasksFromLocalStorage(tasks) {
  const storedTasks = localStorage.getItem("tasks");
  return (storedTasks ? JSON.parse(storedTasks) : []);
}

function writeTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function loadAndDisplayTasksFromLocalStorage() {
  const tasks = loadTasksFromLocalStorage();
  tasks.forEach(function(task) {
    displayTask(task);
  })
}

function displayTask(task) {
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(task));
  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  const i = document.createElement("i");
  i.className = "fa fa-remove";
  link.appendChild(i);
  li.appendChild(link);
  taskList.appendChild(li);
}

function addTask(e) {
  if(taskInput.value.length === 0) {
    alert("Please enter a new task.");
  } else {
    displayTask(taskInput.value);
    const storedTasks = loadTasksFromLocalStorage();
    storedTasks.push(taskInput.value);
    writeTasksToLocalStorage(storedTasks);
    taskInput.value = "";
  }
  e.preventDefault();
}

function removeTask(e) {
  if(e.target.parentElement.classList.contains("delete-item") && confirm("Delete task?")) {
    e.target.parentElement.parentElement.remove();
    const storedTasks = loadTasksFromLocalStorage();
    const taskToDelete = e.target.parentElement.parentElement.textContent;
    console.log(taskToDelete);
    // Deletes last hit, ignoring duplicates. This could make order in localStorage differ from the ul.
    let indexToDelete;
    storedTasks.forEach(function(task, index) {
      if(task === taskToDelete) {
        indexToDelete = index;
      }
    })
    storedTasks.splice(indexToDelete, 1);
    writeTasksToLocalStorage(storedTasks);
  }
  e.preventDefault();
}

function clearTasks(e) {
  if(confirm("Delete all tasks?")) {
    // childNodes is a live collection, so work from the end backwards
    for(let i = taskList.childNodes.length -1; i >= 0; i--) {
      taskList.childNodes[i].remove();
    }
    clearTasksFromLocalStorage();
  }
  e.preventDefault();
}

function filterTasks(e) {
  const target = filter.value.toLowerCase();
  taskList.childNodes.forEach(function(task){
    console.log(task.textContent);
    if(task.textContent.toLowerCase().indexOf(target) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  })
}

