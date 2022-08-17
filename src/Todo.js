import React from 'react'

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    return (
        <div className={todo}>
            <input className="toggle" type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
            <label>{todo.name}</label>
        </div>
    )
}
