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

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
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

  return (
    <>
      <section class="todoapp">
        <h1>Todos</h1>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
        <input class="new-todo" ref={todoNameRef} onKeyDown={handleKeyDown} placeholder="What needs to be done?" type="text" />
        <button onClick={handleClearTodos}>Clear completed</button>
        <footer>{todos.filter(todo => !todo.complete).length} items left</footer>
      </section>
    </>
  )
}

export default App;