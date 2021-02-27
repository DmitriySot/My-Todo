import React from 'react'
import TodoListItem from "../TodoListItem";
import styled from '@emotion/styled'
import {getMQ, breakpoints} from '../helper'

interface todoListProps {
  todos: {id: number, label: string, description: string, important: boolean, done: boolean}[];
  onUpdate: Function;
  onToggleStatus: Function;
  onTogglePosition: Function;
  onEditItem: Function;
}

const StyledTodoList = styled('ul')` 
  margin: 0;
  width: 100%;
  padding: 10px 0;
  & li {
    padding: 10px;
    font-weight: bolder;
  }
  
`

const TodoList: React.FC<todoListProps> = ({todos, onUpdate, onToggleStatus,
                                             onTogglePosition, onEditItem} ) => {
  return (
    <StyledTodoList className="list-group">
      {todos.map(({id, ...item}, i)=>
        <li className="list-group-item"
          key={id}>
            <TodoListItem {...item} id={id}
                          onUpdate={onUpdate}
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
