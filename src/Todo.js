import React, { useState } from "react";
import TodoView from "./TodoView";
import TodoEdit from "./TodoEdit";

export default function Todo({ todo, toggleTodo, deleteTodo, updateTodo }) {
    const [isEditing, setIsEditing] = useState(false);

    console.log(isEditing)

    const setTodoEditable = () => {
        setIsEditing(!isEditing);
    }

    return (
        <>
            {
                (isEditing)
                    ? <TodoEdit todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} setTodoEditable={setTodoEditable} />
                    : <TodoView todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} onDoubleClick={setTodoEditable} />
            }
        </>
    )
}