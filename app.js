// URL of our server
const serverUrl = 'http://localhost:3000';

// Select elements
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskList = document.getElementById('task-list');

// Load tasks when page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Handle form submit
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    const title = taskTitleInput.value.trim();
    if (title === '') return;

    // Send POST request to add task
    try {
        const response = await fetch(`${serverUrl}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });

        if (response.ok) {
            taskTitleInput.value = ''; // Clear input box
            loadTasks(); // Reload task list
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
});

// Load all tasks
async function loadTasks() {
    taskList.innerHTML = ''; // Clear list

    try {
        const response = await fetch(`${serverUrl}/tasks`);
        const tasks = await response.json();

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.title;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.style.marginLeft = '10px';

            // Delete task on button click
            deleteButton.addEventListener('click', () => deleteTask(task.id));

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });

    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

// Delete a task
async function deleteTask(id) {
    try {
        const response = await fetch(`${serverUrl}/tasks/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadTasks(); // Reload task list
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}



