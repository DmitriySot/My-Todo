import React from 'react'
import TodoListItem from "../TodoListItem";
import './style.css'

interface todoListProps {
  todos: {id: number, label: string, important: boolean, done: boolean}[];
  onDelete: Function;
  onToggleStatus: Function;
  onTogglePosition: Function;
}

const TodoList: React.FC<todoListProps> = ({todos, onDelete, onToggleStatus, onTogglePosition} ) => {
  return (
    <ul className="list-group todoList">
      {todos.map(({id, ...item}, i)=>
        <li className="list-group-item"
          key={id}>
            <TodoListItem {...item} id={id}
                          onDelete={onDelete}
                          isFirst={!i}
                          isLast={todos.length-1 === i}
                          onToggleStatus={onToggleStatus}
                          onTogglePosition={onTogglePosition}/>

        </li>
      )}
    </ul>
  )
}

export default TodoList
