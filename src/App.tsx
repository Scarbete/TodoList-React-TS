import { FC, useEffect, useState } from 'react'

import classes from './App.module.sass'
import { ITodo } from './interfaces/ITodo.tsx'
import { TodoForm } from './components/ui/todoForm/todoForm.tsx'
import { TodoList } from './components/ui/todoList/todoList.tsx'


export const App: FC = () => {
    const [ todos, setTodos ] = useState<ITodo[]>([])
    const [ isEdit, setIsEdit ] = useState<ITodo | null>(null)

    const handleAddTodo = (newTodo: ITodo): void => {
        setTodos((prev) => [...prev, newTodo])
    }

    const removeTodo = (id: number): void => {
        setTodos(prev => prev.filter(item => item.id !== id))
    }

    const toggleCompleted = (id: number): void => {
        setTodos(prev => prev.map(item => {
            if (item.id === id) item.completed = !item.completed
            return item
        }))
    }

    const editTodo = (newTodo: ITodo): void => {
        setIsEdit(null)
        setTodos(prev => prev.map(item => {
            if (item.id === newTodo.id) return newTodo
            else return item
        }))
    }

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[]
        setTodos(saved)
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    return (
        <div className={classes.App}>
            <div className={'container'}>
                <div className={classes.App__inner}>
                    <TodoForm handleAddTodo={handleAddTodo}/>
                    <TodoList
                        todos={todos}
                        toggleCompleted={toggleCompleted}
                        removeTodo={removeTodo}
                        editTodo={editTodo}
                        setIsEdit={setIsEdit}
                        isEdit={isEdit}
                    />
                </div>
            </div>
        </div>
    )
}