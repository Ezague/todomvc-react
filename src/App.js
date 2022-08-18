import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import './App.css';
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
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function toggleAllTodos() {
    const newTodos = [...todos]
    const allCompleted = newTodos.filter(todo => todo.complete).length === newTodos.length;
    setTodos(newTodos.map(todo => ({ ...todo, complete: !allCompleted })))
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value
    if (name.trim().length === 0) return
    setTodos(previousTodos => {
      return [...previousTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      handleAddTodo()
    }
  }

  const numCompleted = todos.filter(todo => todo.complete).length
  const numNotCompleted = todos.filter(todo => !todo.complete).length
  const pluralised = numNotCompleted === 1 ? 'item' : 'items'
  const footerText = `${numNotCompleted} ${pluralised} left`

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" ref={todoNameRef} onKeyDown={handleKeyDown} placeholder="What needs to be done?" type="text" autoFocus />
        </header>
        <section className="main">
          <ul className="todo-list">
            <div className="view">
              <TodoList todos={todos} toggleTodo={toggleTodo} />
            </div>
          </ul>
        </section>
        <footer className="footer">
          <ul className="filters">
            <span className="todo-count">{footerText}</span>
            <button onClick={toggleAllTodos}>Toggle all todos</button>
            {numCompleted > 0 && <button className="clear-Completed" onClick={handleClearTodos}>Clear completed</button>}
          </ul>
        </footer>
      </section>
    </>
  )
}

export default App;