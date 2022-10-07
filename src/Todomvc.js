import React, { useState, useRef, useEffect, useMemo } from 'react';
import TodoList from './TodoList';
import { getTodos, addTodo, updateTodo, updateTodoCompleted, deleteTodo } from './services/todo.service';
import { logout } from './services/auth.service';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../node_modules/todomvc-app-css/index.css'
import '../node_modules/todomvc-common/base.css'

function Todomvc() {
    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        getTodos().then((todos) => {
            setTodos(todos);
        }).catch((error) => {
            if (error.response.status === 401) {
                navigate('/login');
            }
        });
    }, [])

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
        updateTodoCompleted(id, todo.completed = !todo.completed).then(setTodos(newTodos))
    }

    function handleUpdateTodo(id, title) {
        updateTodo(id, title).then((todo) => {
            setTodos([...todos.filter(todo => todo.id !== id), todo]);
        })
    }

    function toggleAllTodos() {
        const newTodos = [...todos]
        const allCompleted = newTodos.every(todo => todo.completed)
        newTodos.forEach((todo) => {
            todo.completed = !allCompleted;
            updateTodoCompleted(todo.id, todo.completed);
        });
        setTodos(newTodos)
    }

    function handleAddTodo() {
        const title = todoNameRef.current.value
        if (title.trim().length === 0) return
        addTodo(title).then((todo) => {
            setTodos([...todos, todo])
            todoNameRef.current.value = null
        })
    }

    function handleDeleteTodo(id) {
        deleteTodo(id).then(() => {
            setTodos(previousTodos => {
                return previousTodos.filter(todo => todo.id !== id)
            })
        })
    }

    async function handleClearTodos() {
        const completedTodos = todos.filter(todo => todo.completed)
        completedTodos.forEach(todo => {
            deleteTodo(todo.id)
        })
        setTodos(todos.filter(todo => !todo.completed))
    }

    const handleKeyDown = e => {
        const ENTER_KEY = 13;
        if (e.keyCode === ENTER_KEY) {
            handleAddTodo()
        }
    }

    const handleLogout = () => {
        logout().then(() => {
            navigate('/login');
        });
    }

    const num = todos.length;
    const numCompleted = todos.filter(todo => todo.completed).length
    const numNotCompleted = todos.filter(todo => !todo.completed).length
    const pluralised = numNotCompleted === 1 ? 'item' : 'items'

    return (
        <section className="todoapp">
            <button className='logout' onClick={handleLogout}>Log ud</button>
            <header className="header">
                <h1>todos</h1>
                <input className="new-todo" ref={todoNameRef} onKeyDown={handleKeyDown} placeholder="What needs to be done?" contentEditable="plaintext-only" autoFocus />
            </header>
            <section className="main">
                <input id="toggle-all" className="toggle-all" type="checkbox" onChange={toggleAllTodos} />
                <label htmlFor="toggle-all"></label>
                <ul className="todo-list">
                    <div className="view">
                        <TodoList todos={filterList} toggleTodo={toggleTodo} deleteTodo={handleDeleteTodo} updateTodo={handleUpdateTodo} />
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