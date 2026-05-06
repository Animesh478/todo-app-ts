const form = document.querySelector("form");
const addBtn = document.querySelector(".add-btn");
const listContainer = document.querySelector(".tasks-list");

interface taskType {
  id: number;
  title: string;
  completed: boolean;
}

function createTaskItem(taskItem: taskType) {
  const li = document.createElement("li");
  li.classList.add("task-item");

  const title = document.createElement("p");
  title.textContent = taskItem.title;
  title.classList.add("task-title");
  li.appendChild(title);

  const div = document.createElement("div");
  div.classList.add("cta");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = taskItem.completed;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => deleteTask(taskItem.id));

  div.appendChild(checkbox);
  div.appendChild(deleteBtn);
  li.appendChild(div);

  listContainer?.appendChild(li);
}

function displayTasks() {
  if (listContainer) {
    listContainer.innerHTML = "";
  }
  const tasksList: taskType[] = JSON.parse(
    localStorage.getItem("tasks") || "[]",
  );
  tasksList.forEach((taskItem) => {
    createTaskItem(taskItem);
  });
}

function addTask(e: SubmitEvent) {
  e.preventDefault();
  const taskInput = document.getElementById("task") as HTMLInputElement;
  const newTask: taskType = {
    id: Date.now(),
    title: taskInput ? taskInput.value : "",
    completed: false,
  };

  const tasksList: taskType[] = JSON.parse(
    localStorage.getItem("tasks") || "[]",
  );

  tasksList.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasksList));

  displayTasks();
}

function deleteTask(taskId: number) {
  const tasksList = JSON.parse(localStorage.getItem("tasks") || "[]");
  const filteredList = tasksList.filter(
    (taskItem: taskType) => taskItem.id !== taskId,
  );
  const finalTasksList = JSON.stringify(filteredList);
  localStorage.setItem("tasks", finalTasksList);

  displayTasks();
}

form?.addEventListener("submit", addTask);
displayTasks();
