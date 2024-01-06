import { FC } from 'react'

import classes from './todoList.module.sass'
import { ITodo } from '../../../interfaces/ITodo.tsx'
import { TodoCard } from '../todoCard/todoCard.tsx'


interface TodoListProps {
    todos: ITodo[]
    toggleCompleted(id: number): void
    removeTodo(id: number): void
    editTodo(newTodo: ITodo): void
    setIsEdit(item: ITodo | null): void
    isEdit: ITodo | null
}


export const TodoList: FC<TodoListProps> = ({ todos, toggleCompleted, removeTodo, editTodo, setIsEdit, isEdit }) => {

    return todos.length > 0
        ? (
            <div className={classes.todoList}>
                {todos.map(item =>
                    <TodoCard
                        key={item.id}
                        item={item}
                        toggleCompleted={toggleCompleted}
                        removeTodo={removeTodo}
                        editTodo={editTodo}
                        setIsEdit={setIsEdit}
                        isEdit={isEdit === item}
                    />)
                }
            </div>
        ) : <div className={classes.emptyTodos}>Todos is empty</div>
}