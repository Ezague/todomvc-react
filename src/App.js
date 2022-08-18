import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import TodoList from './TodoList';
import '../node_modules/todomvc-app-css/index.css'
import '../node_modules/todomvc-common/base.css'
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todos-react'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
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
    var ENTER_KEY = 13;
    if (e.keyCode === ENTER_KEY) {
      handleAddTodo()
    }
  }

  const num = todos.filter(todo => todo).length
  const numCompleted = todos.filter(todo => todo.completed).length
  const numNotCompleted = todos.filter(todo => !todo.completed).length
  const pluralised = numNotCompleted === 1 ? 'item' : 'items'

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" ref={todoNameRef} onKeyDown={handleKeyDown} placeholder="What needs to be done?" contentEditable="plaintext-only" autoFocus />
        </header>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" onChange={toggleAllTodos} />
          <label htmlFor="toggle-all"></label>
          <ul className="todo-list">
            <div className="view">
              <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={handleDeleteTodo} />
            </div>
          </ul>
        </section>
        {num > 0 && (
          <footer className="footer">
            <span className="todo-count">{numNotCompleted} <strong>{pluralised}</strong> left</span>
            <ul className="filters">
              <li>
                <a href="#/" className="selected">All</a>
              </li>
              <span />
              <li>
                <a href="#/active">Active</a>
              </li>
              <span />
              <li>
                <a href="#/completed">Completed</a>
              </li>
            </ul>
            {numCompleted > 0 && <button className="clear-completed" onClick={handleClearTodos}>Clear completed</button>}
          </footer>
        )}
      </section>
    </>
  )
}

export default App;