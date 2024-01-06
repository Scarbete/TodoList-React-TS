import { FC, useState } from 'react'

import classes from './todoCard.module.sass'
import { ITodo } from '../../../interfaces/ITodo.tsx'


interface TodoCardProps {
    item: ITodo
    toggleCompleted(id: number): void
    removeTodo(id: number): void
    editTodo(newTodo: ITodo): void
    setIsEdit(item: ITodo | null): void
    isEdit: boolean
}


export const TodoCard: FC<TodoCardProps> = ({ item, toggleCompleted, removeTodo, editTodo, setIsEdit, isEdit }) => {
    const [ newTitle, setNewTitle ] = useState<string>(item.title)
    const [ newBody, setNewBody ] = useState<string>(item.body)

    const editingTodo = (): void => {
        console.log('editingTodo')
        editTodo({...item, title: newTitle, body: newBody})
    }

    const cancelEdit = (): void => {
        setIsEdit(null)
        setNewTitle(item.title)
        setNewBody(item.body)
    }

    return isEdit
        ? (
            <div className={classes.todoCard} style={{backgroundColor: item.completed ? 'greenyellow' : '#e74949'}}>
                <div className={classes.textBlock}>
                    <input
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        type="text"
                        className={classes.textBlock__input}
                    />
                    <input
                        value={newBody}
                        onChange={e => setNewBody(e.target.value)}
                        type="text"
                        className={classes.textBlock__input}
                    />
                    <p>completed: {item.completed ? 'true' : 'false'}</p>
                </div>
                <div className={classes.btnBlock}>
                    <button onClick={() => editingTodo()}>save</button>
                    <button onClick={cancelEdit}>cancel</button>
                    <button onClick={() => toggleCompleted(item.id)}>toggle</button>
                </div>
            </div>
        ) : (
            <div className={classes.todoCard} style={{backgroundColor: item.completed ? 'greenyellow' : '#e74949'}}>
                <div onClick={() => toggleCompleted(item.id)} className={classes.textBlock}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <p>completed: {item.completed ? 'true' : 'false'}</p>
                </div>
                <div className={classes.btnBlock}>
                    <button onClick={() => removeTodo(item.id)}>remove</button>
                    <button onClick={() => setIsEdit(item)}>edit</button>
                    <button onClick={() => toggleCompleted(item.id)}>toggle</button>
                </div>
            </div>
        )
}