const taskInput = document.querySelector('#task');

const form = document.querySelector('#task-form');

const filter = document.querySelector('#filter');

const taskList = document.querySelector('.collection');

const clearBtn = document.querySelector('.clear-tasks');

const reloadIcon = document.querySelector('.fa');


form.addEventListener('submit', addNewTask);

clearBtn.addEventListener('click', clearAllTasks);

filter.addEventListener('keyup', filterTasks);

taskList.addEventListener('click', removeTask);

reloadIcon.addEventListener('click', reloadPage);

document.addEventListener('DOMContentLoaded', loadTasksfromDB);


function addNewTask(e) {

    if (taskInput.value === '') {
        taskInput.style.borderColor = "red";

        return;
    }

    e.preventDefault();
    const li = document.createElement('li');

    li.className = 'collection-item';

    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');

    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);

    addToDatabase(taskInput.value);

}

function clearAllTasks() {

    // taskList.innerHTML = '';

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    clearAllTasksfromDB();

}

function filterTasks(e) {


    if (filter.value === '') {
        filter.style.borderColor = "red";

        return;
    }

    e.preventDefault();

    const userInput = filter.value;
    const lists = document.querySelectorAll('.collection-item');

    lists.forEach(list => {
        if (list.textContent === userInput) {
            list.style.display = 'block';
        } else {
            list.style.display = 'none';
        }

    });




}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure about that ?')) {
            e.target.parentElement.parentElement.remove();
            removefromDB(e.target.parentElement.parentElement);

        }

    }
}

function reloadPage() {

    location.reload();
}



function loadTasksfromDB() {
    let listofTasks = loadfromDB();
    if (listofTasks.length != 0) {

        listofTasks.forEach(function (eachTask) {
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(eachTask));
            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove"> </i>';
            li.appendChild(link);
            taskList.appendChild(li);
        });

    }

}