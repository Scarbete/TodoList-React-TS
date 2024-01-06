import { FC, FormEvent, useState } from 'react'

import classes from './todoForm.module.sass'
import { ITodo } from '../../../interfaces/ITodo.tsx'


interface TodoFormProps {
    handleAddTodo(newItem: ITodo): void
}


export const TodoForm: FC<TodoFormProps> = ({ handleAddTodo }) => {
    const [ title, setTitle ] = useState<string>('')
    const [ body, setBody ] = useState<string>('')

    const addTodo = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        if (title.trim() && body.trim()) {
            const newTodo: ITodo = {
                id: Date.now(),
                title: title,
                body: body,
                completed: false
            }
            handleAddTodo(newTodo)
            setTitle('')
            setBody('')
        }
        else return alert('Вы не заполнили данные!')
    }

    return (
        <form onSubmit={addTodo} className={classes.todoForm}>
            <h1>Todo List</h1>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                type="text"
                placeholder={'Enter title'}
            />
            <input
                value={body}
                onChange={e => setBody(e.target.value)}
                type="text"
                placeholder={'Enter body'}
            />
            <button>create</button>
        </form>
    )
}