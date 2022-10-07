import React, { useState } from 'react'
import '../node_modules/todomvc-app-css/index.css'
import '../node_modules/todomvc-common/base.css'

export default function Todo({ todo, updateTodo, setTodoEditable }) {
    const [title, setTitle] = useState(todo.title)

    console.log(todo)

    const setTodoTitleOnKeystroke = (e) => {
        const ENTER_KEY = 13
        const ESC_KEY = 27
        if (e.keyCode === ENTER_KEY) {
            updateTodo(todo.id, title)
            setTodoEditable()
        } else if (e.keyCode === ESC_KEY) {
            setTodoEditable()
        }
    }

    function setTodoTitleOnBlur() {
        updateTodo(todo.id, title)
        setTodoEditable()
    }

    return (
        <li className="editing">
            <input className="edit" type="text" contentEditable="plaintextonly" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={setTodoTitleOnKeystroke} onBlur={setTodoTitleOnBlur} autoFocus />
        </li>
    )
}
