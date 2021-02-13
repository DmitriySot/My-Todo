import React from 'react'
import TodoListItem from "../TodoListItem";
import './style.css'

interface todoListProps {
  todos: {id: number, label: string, important: boolean, done: boolean}[];
  onDelete: Function;
  onToggleStatus: Function;
}

const TodoList: React.FC<todoListProps> = ({todos, onDelete, onToggleStatus} ) => {
  return (
    <ul className="list-group todoList">
      {todos.map(({id, ...item})=>
        <li className="list-group-item"
          key={id}>
            <TodoListItem {...item} id={id} onDelete={onDelete} onToggleStatus={onToggleStatus} />

        </li>
      )}
    </ul>
  )
}

export default TodoList
