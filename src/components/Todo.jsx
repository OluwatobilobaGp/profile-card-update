import { useState } from "react";
import "./Todo.css";

export default function Todo() {

    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");

    const addTodo = (reactDeepartment) => {
        reactDeepartment.preventDefault();

        if (!task.trim()) return;

        const newTodo = { 
            id: Date.now(), 
            text: task, 
            completed: false, 
        };

        setTodos([...todos, newTodo]);
        setTask("");
    };

    const toggleTodo = (id) => { 
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo)); 
    };

    const deleteTodo = (id) => { 
        setTodos(todos.filter((todo) => todo.id !== id)); 
    };

    return (
        <div className="app">
            <div className="todo-container">
                <h1>My Todo List</h1>
                <form onSubmit={addTodo} className="todo-form">
                    <input type="text" placeholder="What needs to be done?" value={task} onChange={(e) => setTask(e.target.value)} />
                    <button type="submit">Add</button>
                </form>
                <div className="todo-list">
                    {todos.length === 0 ? (<p className="empty">No todos yet. Add one!</p>) : (todos.map((todo) => (<div key={todo.id} className={`todo-item ${todo.completed ? "completed" : ""}`} >
                        <span onClick={() => toggleTodo(todo.id)}>
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>
                            Delete
                        </button> </div>)))}
                </div>
            </div>
        </div>
    )

}
