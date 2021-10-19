'use strict'

function renderTodos() {
    const todos = getTodosForDisplay();
    const strHtmls = todos.map(function (todo) {
        return `<li onclick="onToggleTodo('${todo.id}')" class="${(todo.isDone) ? 'done' : ''}">
                    ${todo.txt}
                    <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
                </li>`
    })
    document.querySelector('.todo-list').innerHTML = strHtmls.join('')
    document.querySelector('.total-count').innerText = getTodosCount();
    document.querySelector('.active-count').innerText = getActiveTodosCount();
    isEmpty(gTodos);  
}

function onRemoveTodo(ev, todoId) {
     console.log(typeof(confirm('Delete todo?')));
    //  return;

    ev.stopPropagation();
    console.log('Removing todo', todoId);
    removeTodo(todoId);
    renderTodos();
}

function onToggleTodo(todoId) {
    console.log('Toggling todo', todoId);
    toggleTodo(todoId);
    renderTodos();
}

function onAddTodo() {
    const elTxt = document.querySelector('input');
    const txt = elTxt.value
    if (!(txt)) return
    const elImp = document.querySelector('.imp')
    const imp = elImp.value
    addTodo(txt,imp)
    renderTodos();
    elTxt.value = '';
    elImp.value = '';
}

function onSetFilter(filterBy) {
    console.log('Filtering By:', filterBy);
    setFilter(filterBy);
    renderTodos();
}

function onSetSort(sortBy) {
    console.log('Sorting By:', sortBy);
    setSort(sortBy);
    renderTodos();
}