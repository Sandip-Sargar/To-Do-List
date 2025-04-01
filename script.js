document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("task-input");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;
    
    let task = { id: Date.now(), text: taskText };
    let tasks = getTasksFromStorage();
    tasks.push(task);
    saveTasksToStorage(tasks);
    taskInput.value = "";
    renderTasks();
}

function loadTasks() {
    renderTasks();
}

function renderTasks() {
    let taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    let tasks = getTasksFromStorage();
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="edit" onclick="editTask(${task.id})">✏️</button>
                <button class="delete" onclick="deleteTask(${task.id})">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function editTask(id) {
    let tasks = getTasksFromStorage();
    let task = tasks.find(t => t.id === id);
    let newText = prompt("Edit your task:", task.text);
    if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasksToStorage(tasks);
        renderTasks();
    }
}

function deleteTask(id) {
    let tasks = getTasksFromStorage().filter(task => task.id !== id);
    saveTasksToStorage(tasks);
    renderTasks();
}

function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
