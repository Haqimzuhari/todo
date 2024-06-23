const columns = document.querySelectorAll('.column');
let draggedItem = null

function autoFocusInputTitle() {
    const title = document.getElementById('todo-name-input')
    title.focus()
}

// Reset todo task editor
function resetTodoTask() {
    const title = document.getElementById('todo-name-input')
    const description = document.getElementById('todo-description-input')
    title.value = ''
    description.innerHTML = ''
}

// Close modal
function closeTodoModal() {
    window.dispatchEvent(
        new CustomEvent('close-modal-overlay', {detail: {id: 'todo-editor-modal'}})
    )
}

// Save add new todo task
function saveTodoTask() {
    const todoColumn = document.getElementById('todo')
    const title = document.getElementById('todo-name-input')
    const description = document.getElementById('todo-description-input')
    const action = document.createElement('div')
    
    action.setAttribute('draggable', true);
    action.setAttribute('x-data', true);
    action.className = "task bg-neutral-800/40 p-4 rounded-lg border border-neutral-700/40 flex flex-col space-y-2 cursor-grabbing"
    action.innerHTML = `
        <div class="flex justify-between items-center">
            <p class="font-medium">${title.value}</p>
            <button type="button">x</button>
        </div>
        <p class="text-sm text-neutral-200/60">${description.innerHTML}</p>
    `
    action.innerHTML = `
        <div class="flex justify-between items-center">
            <p class="font-bold">${title.value}</p>
            <button type="button" x-on:click="deleteTodoTask($el)" class="text-neutral-600 hover:text-neutral-100 transition outline-none appearance-none ring-neutral-700 rounded-lg focus:ring-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 stroke-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <p class="text-neutral-300 break-words whitespace-pre-wrap">${description.innerHTML}</p>
        <div class="comment-container pt-4">
            <div class="comment-form flex">
                <input type="text" x-on:keyup.enter="addComment($el)"  class="appearance-none outline-none w-full rounded-lg bg-neutral-800 px-2 py-1 ring-indigo-400 transition hover:ring-4 focus:ring-4 active:ring-4 text-sm" placeholder="Comment"/>
            </div>
            <div class="comment-section divide-y divide-neutral-700/50 pt-2"></div>
        </div>
    `
    todoColumn.appendChild(action)
    addDragAndDropEvents()
    resetTodoTask()
    storeTasks()
    closeTodoModal()
}

function deleteTodoTask(element) {
    const task = element.closest('.task')
    task.remove()
    storeTasks()
}

// Save tasks into local browser storage
function storeTasks() {
    const tasks = {
        todo: document.getElementById('todo').innerHTML,
        ongoing: document.getElementById('ongoing').innerHTML,
        done: document.getElementById('done').innerHTML
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load all tasks
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        document.getElementById('todo').innerHTML = tasks.todo;
        document.getElementById('ongoing').innerHTML = tasks.ongoing;
        document.getElementById('done').innerHTML = tasks.done;
    }
    addDragAndDropEvents();
}

function addComment(element) {
    let newComment = element.value.trim()
    if (newComment != '') {
        const commentSection = element.parentNode.nextElementSibling
        const comment = document.createElement('div')
        comment.className = 'comment py-3 flex justify-between items-start'
        comment.innerHTML = `
            <p class="text-sm text-neutral-300/90 break-words whitespace-pre-wrap">${newComment}</p>
            <button type="button" x-on:click="deleteComment($el)" class="text-neutral-600 hover:text-neutral-100 transition outline-none appearance-none ring-neutral-700 rounded-lg focus:ring-2 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 stroke-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        `
        commentSection.appendChild(comment)
        element.value = ''
        storeTasks()
    } else {
        console.log('empty comment')
    }
}

function deleteComment(element) {
    const comment = element.closest('.comment')
    comment.remove()
    storeTasks()
}

// Drag & drop functions
function addDragAndDropEvents() {
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        task.addEventListener('dragstart', () => {
            draggedItem = task;
            setTimeout(() => {
                task.classList.add('dragging');
            }, 0);
        });

        task.addEventListener('dragend', () => {
            setTimeout(() => {
                task.classList.remove('dragging');
                draggedItem = null;
                storeTasks();
            }, 0);
        });
    });

    columns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = getDragAfterElement(column, e.clientY);
            if (afterElement == null) {
                column.appendChild(draggedItem);
            } else {
                column.insertBefore(draggedItem, afterElement);
            }
        });
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function getClosestColumn(x, y) {
    let closestColumn = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    columns.forEach(column => {
        const box = column.getBoundingClientRect();
        const distance = Math.sqrt(Math.pow(x - (box.left + box.width / 2), 2) + Math.pow(y - (box.top + box.height / 2), 2));
        if (distance < closestDistance) {
            closestDistance = distance;
            closestColumn = column;
        }
    });

    return closestColumn;
}

loadTasks()