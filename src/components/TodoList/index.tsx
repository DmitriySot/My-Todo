import React from 'react'
import TodoListItem from "../TodoListItem";
import './style.css'

interface todoListProps {
  todos: {id: number, label: string, description: string, important: boolean, done: boolean}[];
  onDelete: Function;
  onToggleStatus: Function;
  onTogglePosition: Function;
  onEditItem: Function;
}

const TodoList: React.FC<todoListProps> = ({todos, onDelete, onToggleStatus,
                                             onTogglePosition, onEditItem} ) => {
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
                          onTogglePosition={onTogglePosition}
                          onEditItem={onEditItem}/>

        </li>
      )}
    </ul>
  )
}

export default TodoList
