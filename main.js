const listContainer = document.getElementById('listContainer');
const addListButton = document.getElementById('addListButton');
const listNameInput = document.getElementById('listName');
const mainSide = document.querySelector('.mainSide');

let lists = {};
let currentList = null;

addListButton.addEventListener('click', () => {
    const listName = listNameInput.value.trim();

    if (listName.length < 3) {
        alert('List name must be at least 3 characters long.');
        return;
    }

    if (!lists[listName]) {
        lists[listName] = []; 
        console.log(`Added new list: ${listName}`, lists); 
        renderLists(); 
        listNameInput.value = ''; 
    } else {
        alert('List with this name already exists.');
    }
});

function renderLists() {
    listContainer.innerHTML = ''; 

    for (const listName in lists) {
        const listElement = document.createElement('div');
        listElement.classList.add('list-item');
        listElement.textContent = listName;

        listElement.addEventListener('click', () => {
            currentList = listName; 
            console.log(`Selected list: ${listName}`, lists); 
            renderTasks(); 
        });

        listContainer.appendChild(listElement); 
    }
}

function renderTasks() {
    mainSide.innerHTML = ''; 

    if (currentList) {
        console.log(`Rendering tasks for list: ${currentList}`, lists[currentList]); 

        const title = document.createElement('h2');
        title.textContent = `Tasks for "${currentList}"`;
        mainSide.appendChild(title);

        // Add a container for adding new tasks
        const addTaskContainer = document.createElement('div');
        addTaskContainer.classList.add('add-task-container');

        const taskInput = document.createElement('input');
        taskInput.type = 'text';
        taskInput.placeholder = 'Enter a new task...';
        taskInput.id = 'taskInput';
        addTaskContainer.appendChild(taskInput);

        const addTaskButton = document.createElement('button');
        addTaskButton.textContent = 'Add Task';
        addTaskButton.classList.add('add-task-btn');
        addTaskContainer.appendChild(addTaskButton);

        mainSide.appendChild(addTaskContainer);

        const taskList = document.createElement('ul');
        taskList.classList.add('task-list');

        // Check if there are tasks in the current list
        if (lists[currentList].length === 0) {
            const noTasksMessage = document.createElement('p');
            noTasksMessage.textContent = 'No tasks available for this list.';
            mainSide.appendChild(noTasksMessage);
        } else {
            lists[currentList].forEach((task, index) => {
                const taskItem = document.createElement('li');
                taskItem.textContent = task;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-task-btn');
                deleteButton.addEventListener('click', () => {
                    lists[currentList].splice(index, 1); 
                    console.log(`Deleted task: "${task}" from list: ${currentList}`); 
                    renderTasks(); 
                });

                taskItem.appendChild(deleteButton); 
                taskList.appendChild(taskItem); 
            });
        }

        mainSide.appendChild(taskList);

        addTaskButton.removeEventListener('click', addTask); 
        addTaskButton.addEventListener('click', addTask); 

        function addTask() {
            const newTask = taskInput.value.trim();
            if (newTask.length > 0) {
                lists[currentList].push(newTask); 
                console.log(`Added task: "${newTask}" to list: ${currentList}`, lists[currentList]); 
                taskInput.value = ''; 
                renderTasks(); 
            } else {
                alert('Task cannot be empty.');
            }
        }
    }
}

renderLists();
