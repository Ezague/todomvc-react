import React, { useState, useRef, useEffect, useMemo } from 'react';
import TodoList from './TodoList';
import Login from './Login';
import { getTodos } from './services/todo.service';
import { NavLink, useLocation } from 'react-router-dom';
import '../node_modules/todomvc-app-css/index.css'
import '../node_modules/todomvc-common/base.css'
import { v4 as uuidv4 } from 'uuid';

function Todomvc() {
    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()

    useEffect(() => {
        getTodos().then((todos) => {
            setTodos(todos);
        });
    }, [])

    useEffect(() => {
        getTodos().then((todos) => {
            setTodos(todos);
        });
    }, [todos])

    const location = useLocation()

    const filterList = useMemo(() => {
        switch (location.pathname) {
            case '/':
                return todos
            case '/active':
                return todos.filter(todo => !todo.completed)
            case '/completed':
                return todos.filter(todo => todo.completed)
            default:
                return todos
        }
    }, [todos, location])

    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.completed = !todo.completed
        setTodos(newTodos)
    }

    function updateTodo(id, title) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.title = title
        setTodos(newTodos)
    }

    function toggleAllTodos() {
        const newTodos = [...todos]
        const allCompleted = newTodos.filter(todo => todo.completed).length === newTodos.length;
        setTodos(newTodos.map(todo => ({ ...todo, completed: !allCompleted })))
    }

    function handleAddTodo() {
        const title = todoNameRef.current.value
        if (title.trim().length === 0) return
        setTodos(previousTodos => {
            return [...previousTodos, { id: uuidv4(), title: title, completed: false }]
        })
        todoNameRef.current.value = null
    }

    function handleDeleteTodo(id) {
        setTodos(previousTodos => previousTodos.filter(todo => todo.id !== id))
    }

    function handleClearTodos() {
        const newTodos = todos.filter(todo => !todo.completed)
        setTodos(newTodos)
    }

    const handleKeyDown = e => {
        const ENTER_KEY = 13;
        if (e.keyCode === ENTER_KEY) {
            handleAddTodo()
        }
    }

    const num = todos.length;
    const numCompleted = todos.filter(todo => todo.completed).length
    const numNotCompleted = todos.filter(todo => !todo.completed).length
    const pluralised = numNotCompleted === 1 ? 'item' : 'items'

    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo" ref={todoNameRef} onKeyDown={handleKeyDown} placeholder="What needs to be done?" contentEditable="plaintext-only" autoFocus />
            </header>
            <section className="main">
                <Login />
                <input id="toggle-all" className="toggle-all" type="checkbox" onChange={toggleAllTodos} />
                <label htmlFor="toggle-all"></label>
                <ul className="todo-list">
                    <div className="view">
                        <TodoList todos={filterList} toggleTodo={toggleTodo} deleteTodo={handleDeleteTodo} updateTodo={updateTodo} />
                    </div>
                </ul>
            </section>
            {num > 0 && (
                <footer className="footer">
                    <span className="todo-count">{numNotCompleted} <strong>{pluralised}</strong> left</span>
                    <ul className="filters">
                        <li>
                            <NavLink to="/" exact="true" className={({ isActive }) => isActive ? 'selected' : null}>All</NavLink>
                        </li>
                        <span />
                        <li>
                            <NavLink to="/active" className={({ isActive }) => isActive ? 'selected' : null}>Active</NavLink>
                        </li>
                        <span />
                        <li>
                            <NavLink to="/completed" className={({ isActive }) => isActive ? 'selected' : null}>Completed</NavLink>
                        </li>
                    </ul>
                    {numCompleted > 0 && <button className="clear-completed" onClick={handleClearTodos}>Clear completed</button>}
                </footer>
            )}
        </section>
    )
}

export default Todomvc;