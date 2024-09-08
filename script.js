// Load tasks from local storage on page load
window.onload = function () {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    savedTasks.forEach(task => {
        const newTask = createTaskElement(task.text, task.completed);
        taskList.appendChild(newTask);
    });
};

// Function to create a new task element
function createTaskElement(text, completed) {
    const newTask = document.createElement('li');
    
    // Display task text without any extra words
    newTask.textContent = text;

    // Add delete button to the task
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerHTML = '<svg class="delete-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
    deleteButton.addEventListener('click', deleteTask);
    newTask.appendChild(deleteButton);

    // Add checkbox for completion status
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', toggleCompletion);
    newTask.insertBefore(checkbox, newTask.firstChild);

    return newTask;
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('newTaskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        // Create a new task element
        const newTask = createTaskElement(taskText, false);

        // Add task to the task list
        document.getElementById('taskList').appendChild(newTask);

        // Save tasks to local storage
        saveTasksToLocalStorage();

        // Clear the input field
        taskInput.value = '';
    }
}

// Function to delete a task
function deleteTask(event) {
    const task = event.target.closest('li'); // Find the closest <li> element
    if (task) {
        task.remove(); // Remove the task element
        // Save tasks to local storage after deletion
        saveTasksToLocalStorage();
    }
}

// Function to toggle completion status
function toggleCompletion(event) {
    const task = event.target.parentElement;
    task.classList.toggle('completed');

    // Save tasks to local storage after toggling completion
    saveTasksToLocalStorage();
}

// Add task when Enter key is pressed
document.getElementById('newTaskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
         addTask();
         event.preventDefault(); // Prevent default form submission behavior
    }
});

// Add task when Add button is clicked
document.getElementById('addTaskBtn').addEventListener('click', function() {
    addTask();
});

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = Array.from(document.getElementById('taskList').children).map(task => {
        return { text: task.textContent.trim(), completed: task.classList.contains('completed') };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
