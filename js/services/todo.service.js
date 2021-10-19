'use strict'

var gTodos
var gSortBy
_createTodos()

var gFilterBy = 'ALL'

function getTodosForDisplay() {
    if (gFilterBy === 'ALL') return gTodos;
    const todos = gTodos.filter(function (todo) {
        return (todo.isDone && gFilterBy === 'DONE') ||
            (!todo.isDone && gFilterBy === 'ACTIVE')
    })
    return todos;
}

function getSortForDisplay() {
    const todos = gTodos.filter(function (todo) {
        return (todo.txt && gSortBy === 'txt') ||
            (todo.creztedAt && gSortBy === 'creztedAt') ||
            (todo.importance && gSortBy === 'importance')
    })
    return todos;
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1);
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone;
    _saveTodosToStorage()
}

function addTodo(txt, imp) {
    const todo = _createTodo(txt, imp)
    gTodos.push(todo);
    _saveTodosToStorage();
}

function getTodosCount() {
    return gTodos.length
}

function getActiveTodosCount() {
    const todos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return todos.length
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    gSortBy = sortBy;
    if (sortBy === 'TEXT')
        gTodos.sort((todo1, todo2) => (todo1.txt > todo2.txt ? 1 : -1));

    if (sortBy === 'CREATED')
        gTodos.sort((todo1, todo2) => todo1.createdAt - todo2.createdAt);

    if (sortBy === 'IMPORTENCE')
        gTodos.sort((todo1, todo2) => todo1.importance - todo2.importance);
}


function _saveTodosToStorage() {
    saveToStorage('todosDB', gTodos)
}


function _createTodo(txt, importance) {
    const todo = {
        id: _makeId(),
        txt,
        isDone: false,
        creztedAt: Date.now(),
        importance
    }
    return todo;
}

function _createTodos() {
    var todos = loadFromStorage('todosDB')
    // Setup Demo data
    if (!todos || !todos.length) {
        todos = [
            _createTodo('Learn HTML', 1),
            _createTodo('Study CSS', 2),
            _createTodo('Master JS', 3),
        ];
    }
    console.log(todos)
    gTodos = todos
    _saveTodosToStorage()
}

function _makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function isEmpty(arr) {
    console.log('isEmpy?')
    if (arr.length === 0) {
        document.querySelector(".empty").style.display = "block";
    }
    else
        document.querySelector(".empty").style.display = "none";
}