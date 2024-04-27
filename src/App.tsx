import "./App.sass"
import {useState} from "react"
import Todo from "./components/Todo/Todo"
import "react-swipeable-list/dist/styles.css"

import styles from "./App.module.sass"

interface ITodo {
    id: number,
    title: string
    completed: boolean
}

function App() {
    const [todos, setTodos] = useState<ITodo[]>([])

    function addTodo() {
        const newIndex = (todos.length > 0 ? todos[todos.length - 1].id : 0) + 1
        const todo = {
            id: newIndex,
            title: `Todo ${newIndex}`,
            completed: false
        }

        setTodos([...todos, todo])
    }

    function removeTodo(id: number) {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    function changeTodo(id: number, title: string) {
        todos.map(todo => {
            if (todo.id === id) todo.title = title
        })
        setTodos([...todos])
    }

    function completeTodo(id: number, state: boolean) {
        todos.map(todo => {
            if (todo.id === id) todo.completed = state
        })
        setTodos([...todos])
    }

    return (
        <>
            <h1>Todo list</h1>
            <div className="card">
                <button onClick={addTodo}>Add Todo</button>
            </div>
            <ul className={styles.list}>
                {todos.map(todo => <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed}
                    onRemove={removeTodo}
                    onChanged={changeTodo}
                    onCompleted={completeTodo}
                />)}
            </ul>
        </>
    )
}

export default App
