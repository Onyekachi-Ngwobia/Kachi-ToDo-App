const newList = document.querySelector('#newListId');
const listAll = document.querySelector('.listAllC');
const add = document.querySelector('.checkmarkNewList');
const itemsLeft = document.querySelector('.itemsLeft');
const showOnly = document.querySelectorAll('.showOnly a');
const showOnlyMobile = document.querySelectorAll('.showOnlyMobile a');
const btnshowOnly = document.getElementsByClassName('btn');
const clearCompleted = document.querySelector('.clearCompleted');

newList.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
        createElement();
    }
});

add.addEventListener('click', createElement);

function createElement() {
    if (newList.value.trim() === '') {
        alert('Write something!');
        return;
    }

    let li = document.createElement('li');
    li.className = 'listC';
    li.draggable = 'true';

    let input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'checkbox';

    let span = document.createElement('span');
    span.className = 'checkmark';

    let listName = document.createElement('div');
    listName.className = 'listName';
    listName.textContent = newList.value;

    let crossIcon = document.createElement('div');
    crossIcon.className = 'cross';
    crossIcon.innerHTML = '❌'; // Ensure an actual icon is visible

    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(listName);
    li.appendChild(crossIcon);

    listAll.appendChild(li);
    newList.value = '';

    input.addEventListener('change', updateCount);
    crossIcon.addEventListener('click', function () {
        li.remove();
        updateCount();
        nolist();
    });

    updateCount();
    nolist();
}

function updateCount() {
    let total = document.querySelectorAll('.listC:not(.noListC)').length;
    let activeCount = document.querySelectorAll('.checkbox:not(:checked)').length;
    let completedCount = total - activeCount;

    let activeTab = document.querySelector('.showOnlyActive.active');
    let completedTab = document.querySelector('.showOnlyCompleted.active');

    if (activeTab) {
        itemsLeft.innerHTML = `${activeCount} active items`;
    } else if (completedTab) {
        itemsLeft.innerHTML = `${completedCount} completed items`;
    } else {
        itemsLeft.innerHTML = `${total} items total`;
    }
}

showOnly.forEach((btn) => {
    btn.addEventListener('click', () => {
        for (let btnEach of btnshowOnly) {
            btnEach.classList.remove('active');
        }
        btn.classList.add('active');
        filtering();
        updateCount();
    });
});

showOnlyMobile.forEach((btn) => {
    btn.addEventListener('click', () => {
        for (let btnEach of btnshowOnly) {
            btnEach.classList.remove('active');
        }
        btn.classList.add('active');
        filtering();
        updateCount();
    });
});

function filtering() {
    let allTasks = document.querySelectorAll('.listC:not(.noListC)');
    let showActive = document.querySelector('.showOnlyActive.active');
    let showCompleted = document.querySelector('.showOnlyCompleted.active');

    allTasks.forEach(task => {
        task.style.display = 'block';
    });

    if (showActive) {
        document.querySelectorAll('.checkbox:checked').forEach(checkbox => {
            checkbox.parentElement.style.display = 'none';
        });
    } else if (showCompleted) {
        document.querySelectorAll('.checkbox:not(:checked)').forEach(checkbox => {
            checkbox.parentElement.style.display = 'none';
        });
    }

    nolist();
}

clearCompleted.addEventListener('click', () => {
    document.querySelectorAll('.checkbox:checked').forEach(checkbox => {
        checkbox.parentElement.remove();
    });
    updateCount();
    nolist();
});

function nolist() {
    let totalList = document.querySelectorAll('.listC:not(.noListC)').length;
    let existingNoList = document.querySelector('.noListC');

    if (totalList === 0) {
        if (!existingNoList) {
            let li = document.createElement('li');
            li.className = 'listC noListC';
            li.innerHTML = '<div class="noList">Not found.</div>';
            listAll.appendChild(li);
        }
    } else {
        if (existingNoList) existingNoList.remove();
    }
}
