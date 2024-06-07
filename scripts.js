document.addEventListener('DOMContentLoaded', () => {
    const actionForm = document.getElementById('actionForm');
    const actionName = document.getElementById('actionName');
    const actionDescription = document.getElementById('actionDescription');
    const columns = document.querySelectorAll('.column');

    let draggedItem = null;

    function saveActions() {
        const actions = {
            todo: document.getElementById('todo').innerHTML,
            ongoing: document.getElementById('ongoing').innerHTML,
            done: document.getElementById('done').innerHTML
        };
        localStorage.setItem('actions', JSON.stringify(actions));
    }

    function loadActions() {
        const actions = JSON.parse(localStorage.getItem('actions'));
        if (actions) {
            document.getElementById('todo').innerHTML = actions.todo;
            document.getElementById('ongoing').innerHTML = actions.ongoing;
            document.getElementById('done').innerHTML = actions.done;
        }
        addDragAndDropEvents();
        addDeleteActionEvents();
        addCommentEvents();
    }

    function addAction(name, description) {
        const action = document.createElement('div');
        action.classList.add('action');
        action.classList.add('bg-white', 'rounded-lg', 'p-2', 'md:p-4', 'cursor-grabbing', 'space-y-2');
        action.setAttribute('draggable', true);
        action.innerHTML = `
            <div class="flex items-start space-x-2">
                <p class="font-bold w-full text-sm lg:text-base">${name}</p>
                <button class="delete-btn w-3 flex-none">&times;</button>
            </div>
            <p class="break-words whitespace-pre-wrap text-sm lg:text-base">${description}</p>
            <hr/>
            <div class="comments space-y-2">
                <form class="comment-form flex space-x-1">
                    <input type="text" class="w-full rounded border px-2 py-1 text-xs" placeholder="Add comment" required/>
                    <button type="submit" class="inline-block rounded bg-indigo-500 hover:bg-indigo-600 px-2 py-1 text-xs text-white font-semibold">Add</button>
                </form>
            </div>
        `;
        document.getElementById('todo').appendChild(action);
        saveActions();
        addDragAndDropEvents();
        addDeleteActionEvents();
        addCommentEvents();
    }

    function addDragAndDropEvents() {
        const actions = document.querySelectorAll('.action');
        actions.forEach(action => {
            action.addEventListener('dragstart', () => {
                draggedItem = action;
                setTimeout(() => {
                    action.classList.add('dragging');
                }, 0);
            });

            action.addEventListener('dragend', () => {
                setTimeout(() => {
                    action.classList.remove('dragging');
                    draggedItem = null;
                    saveActions();
                }, 0);
            });

            // Mobile touch support
            action.addEventListener('touchstart', (e) => {
                draggedItem = action;
                setTimeout(() => {
                    action.classList.add('dragging');
                }, 0);
                e.preventDefault();
            });

            action.addEventListener('touchend', () => {
                setTimeout(() => {
                    action.classList.remove('dragging');
                    draggedItem = null;
                    saveActions();
                }, 0);
            });

            action.addEventListener('touchmove', (e) => {
                const touch = e.touches[0];
                const afterElement = getDragAfterElement(document.elementFromPoint(touch.clientX, touch.clientY));
                if (afterElement) {
                    afterElement.parentElement.insertBefore(draggedItem, afterElement);
                } else {
                    const closestColumn = getClosestColumn(touch.clientX, touch.clientY);
                    if (closestColumn) {
                        closestColumn.appendChild(draggedItem);
                    }
                }
                e.preventDefault();
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
        const draggableElements = [...container.querySelectorAll('.action:not(.dragging)')];

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

    function addDeleteActionEvents() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.parentNode.parentNode.remove();
                saveActions();
            });
        });
    }

    function addCommentEvents() {
        const commentForms = document.querySelectorAll('.comment-form');
        commentForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = form.querySelector('input');
                const comment = document.createElement('div');
                comment.classList.add('comment', 'pt-2', 'flex', 'items-start', 'space-x-1', 'border-t');
                comment.innerHTML = `
                    <p class="w-full text-xs lg:text-sm break-words whitespace-pre-wrap">${input.value}</p>
                    <button class="delete-comment-btn w-2 flex-none text-xs lg:text-sm">&times;</button>
                `;
                form.parentElement.appendChild(comment);
                input.value = '';
                saveActions();
                addDeleteCommentEvents();
            });
        });
    }

    function addDeleteCommentEvents() {
        const deleteCommentButtons = document.querySelectorAll('.delete-comment-btn');
        deleteCommentButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.parentElement.remove();
                saveActions();
            });
        });
    }

    actionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addAction(actionName.value, actionDescription.value);
        actionName.value = '';
        actionDescription.value = '';
    });

    loadActions();
});