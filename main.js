const addButton = document.getElementById('addListButton');
const listContainer = document.getElementById('listContainer');

addButton.addEventListener('click', function() {
    let listName = document.getElementById('listName').value;


    if (listName.length < 3) {
        alert("List name must be at least 3 characters long.");
        return;
    }


    const newListItem = document.createElement('li');
    newListItem.textContent = listName;

    listContainer.appendChild(newListItem);


    document.getElementById('listName').value = '';
});
