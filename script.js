// creating elements from html
const form = document.getElementById("form");
const input = document.getElementById("input");
const formButton = document.getElementById("formButton");
const taskList = document.getElementById("taskslist");
const text = document.getElementById("helpText");

// Retrviewing tasks array from local storage
const storedTasks = JSON.parse(localStorage.getItem("tasks"));

// Initializing tasks with stored data or an empty array
tasks = storedTasks || [];

// Adding event Listners to form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

// function to add tasks
const addTask = () => {
  const newTask = input.value;
  if (newTask) {
    tasks.unshift(newTask);
    input.value = "";
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  // hide the text when tasks are found
  if (tasks.length > 0) {
    text.style.visibility = "hidden";
  }
  renderTasks();
};

// funtion to delete Task
const deleteTask = (index) => {
  // delete task from array
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  // if tasks are not found again make text visible
  if (tasks.length == 0) text.style.visibility = "visible";
};

// function to render tasks
const renderTasks = () => {
  taskList.innerHTML = ""; // It makes taskList empty for every render
  // Looping tasks array
  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.classList.add("task");
    div.innerHTML = `
          <h5 id="taskTitle" class="taskTitle" key= ${index}>
           ${task}
          </h5>
        <div style="display: flex; align-items: center; gap: 2px">
            <input
              type="checkbox"
              name="complete"
              id="completed"
              class="complete"
            />
            <button id="delete"
            >❌</button>
        `;
    taskList.appendChild(div);
  });
};

renderTasks();

const handleDeleteAndComplete = (event) => {
  const target = event.target;
  if (target.tagName === "BUTTON") {
    // Get index value from taskTitle
    const taskIndex = target
      .closest(".task")
      .querySelector(".taskTitle")
      .getAttribute("key");
    // Call your delete function with the taskIndex
    deleteTask(taskIndex);
  } else if (target.tagName === "INPUT") {
    // Adding checked class to h5 element which holds task
    const taskTitleElement = target
      .closest(".task")
      .querySelector(".taskTitle");
    taskTitleElement.classList.toggle("checked");
  }
};

// using event delgation to catch user clicks
taskList.addEventListener("click", handleDeleteAndComplete);
