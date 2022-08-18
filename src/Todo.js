import React from 'react'
import '../node_modules/todomvc-app-css/index.css'
import '../node_modules/todomvc-common/base.css'

export default function Todo({ todo, toggleTodo, deleteTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    const handleDoubleClick = () => {
        console.log(`double click name: ${todo.title}, id: ${todo.id}`)
    }

    function handleDestroyClick() {
        deleteTodo(todo.id)
    }

    return (
        <li className={todo.completed ? 'completed' : ''} onDoubleClick={handleDoubleClick}>
            <div role="listitem">
                <div className="view"></div>
                <input className="toggle" type="checkbox" checked={todo.completed} onChange={handleTodoClick} />
                <label>{todo.title}</label>
                <button className="destroy" onClick={handleDestroyClick}></button>
            </div>
        </li>
    )
}
