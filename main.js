const listContainer = document.getElementById('listContainer');
const addListButton = document.getElementById('addListButton');
const listNameInput = document.getElementById('listName');
const mainSide = document.querySelector('.mainSide');

let lists = JSON.parse(localStorage.getItem('lists')) || {}; 
let currentList = null;

addListButton.addEventListener('click', () => {
    const listName = listNameInput.value.trim();

    if (listName.length < 3) {
        alert('List name must be at least 3 characters long.');
        return;
    }

    if (!lists[listName]) {
        lists[listName] = [];
        saveListsToLocalStorage(); 
        renderLists();
        listNameInput.value = '';
    } else {
        alert('List with this name already exists. Please enter a new name.');
    }
});

function saveListsToLocalStorage() {
    localStorage.setItem('lists', JSON.stringify(lists)); 
}

function renderLists() {
    listContainer.innerHTML = '';

    for (const listName in lists) {
        const listElement = document.createElement('div');
        listElement.classList.add('list-item');
        listElement.textContent = listName;

        listElement.addEventListener('click', () => {
            currentList = listName;
            renderTasks();
        });

        listContainer.appendChild(listElement);
    }
}

function renderTasks() {
    mainSide.innerHTML = '';

    if (currentList) {
        const title = document.createElement('h2');
        title.textContent = `Tasks for "${currentList}"`;
        mainSide.appendChild(title);

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

        if (lists[currentList].length === 0) {
            const noTasksMessage = document.createElement('p');
            noTasksMessage.textContent = 'No tasks available for this list.';
            mainSide.appendChild(noTasksMessage);
        } else {
            lists[currentList].forEach((task, index) => {
                const taskItem = document.createElement('li');

                const taskContent = document.createElement('span');
                taskContent.textContent = task;

                const buttonGroup = document.createElement('div');
                buttonGroup.classList.add('button-group');

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-task-btn');
                deleteButton.addEventListener('click', () => {
                    lists[currentList].splice(index, 1);
                    saveListsToLocalStorage(); 
                    renderTasks();
                });

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.classList.add('edit-task-btn');
                editButton.addEventListener('click', () => {
                    const inputField = document.createElement('input');
                    inputField.type = 'text';
                    inputField.value = task;

                    taskItem.replaceChild(inputField, taskContent);

                    const saveButton = document.createElement('button');
                    saveButton.textContent = 'Save';
                    saveButton.classList.add('save-task-btn');
                    saveButton.addEventListener('click', () => {
                        const newTask = inputField.value.trim();
                        if (newTask.length > 0) {
                            lists[currentList][index] = newTask;
                            saveListsToLocalStorage(); 
                            renderTasks();
                        } else {
                            alert('Task cannot be empty.');
                        }
                    });

                    taskItem.appendChild(saveButton);
                });

                buttonGroup.appendChild(editButton);
                buttonGroup.appendChild(deleteButton);

                taskItem.appendChild(taskContent);
                taskItem.appendChild(buttonGroup);

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
                saveListsToLocalStorage(); 
                taskInput.value = '';
                renderTasks();
            } else {
                alert('Task cannot be empty.');
            }
        }
    }
}

renderLists(); 
