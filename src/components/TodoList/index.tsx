import React from 'react'
import TodoListItem from "../TodoListItem";
import styled from '@emotion/styled'

interface todoListProps {
  todos: {id: number, label: string, description: string, important: boolean, done: boolean}[];
  onDelete: Function;
  onToggleStatus: Function;
  onTogglePosition: Function;
  onEditItem: Function;
}

const StyledTodoList = styled('ul')` 
  padding: 10px;
  width: 500px;
  & li {
    padding: 10px;
    font-weight: bolder;
  }
  
`

const TodoList: React.FC<todoListProps> = ({todos, onDelete, onToggleStatus,
                                             onTogglePosition, onEditItem} ) => {
  return (
    <StyledTodoList className="list-group">
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
    </StyledTodoList>
  )
}

export default TodoList
