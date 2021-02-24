import React from 'react'
import styled from '@emotion/styled'
import {css} from '@emotion/css'
import {getMQ, breakpoints} from '../helper'


interface todoListItemProps {
  label: string;
  description: string;
  done: boolean;
  important: boolean;
  id: number;
  onDelete: Function;
  onToggleStatus: Function;
  onTogglePosition: Function;
  isFirst: boolean;
  isLast: boolean;
  onEditItem: Function;
}

const StyledTodoListItem = styled('div') `
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & button {
      width: 30px;
      margin-right: 5px;
      margin-bottom: 5px;
    }
    
`
const StyledDescriptionItem = styled('textarea') `
   width: 100%;
`
const StyledTodoListItemLabel = styled('div') `
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    
    ${getMQ(breakpoints.sm, true)} {
      flex-direction: column;
      & span {
        margin-bottom: 10px;
      }
      & button {
        margin-top: 5px;
      }
  }
`

const TodoListItem: React.FC<todoListItemProps> = ({label, description, important = false,
                                                     id, done, onDelete,
                                                     onToggleStatus, onTogglePosition, onEditItem,
                                                   isFirst, isLast}) => {

  const [editItem, setEditItem] = React.useState<string>(label)
  const [editDescription, setEditDescription] = React.useState<string>(description)

  const [isEditMode, setIsEditMode] = React.useState<boolean>(false)

  const [isOpenDescription, setIsOpenDescription] = React.useState<boolean>(false)

  const onDeleteClick = () => {
      // console.log("__onDelete__", onDelete)
      onDelete(id)
  }

  const onImportantClick = () => {
      onToggleStatus(id, "important")
  }

  const onLabelClick = () => {
      onToggleStatus(id, "done")
  }

  const divCss = {
    textDecoration: done? "line-through" : '',
    color: important? "tomato" : ''
  }

  const onDownClick = () => {
    onTogglePosition(id, "down")
  }
  const onUpClick = () => {
    onTogglePosition(id, "up")
  }

  const onEditClick = () => {
    editItem !== label && editItem !== '' && onEditItem(id, editItem)
    setIsEditMode(!isEditMode)

  }
  const onInputChange = (e: any) => {
    setEditItem(e.target.value)
  }
  const onEnterPress = (e: any) => {

    if(isEditMode && e.key === 'Enter') onEditClick()

  }

  const onToggleDescription = () => {
    !isOpenDescription && onEditItem(id, label, editDescription)
    setIsOpenDescription(!isOpenDescription)
  }
  const onChangeDescription = (e: any) => {
    setEditDescription(e.target.value)
  }

  return (

    <StyledTodoListItem>

      <StyledTodoListItemLabel>
        {isEditMode ?
          <input autoFocus
                 placeholder="edit"
                 defaultValue={label}
                 onChange={onInputChange}
                 onBlur={onEditClick}
                  onKeyDown={onEnterPress}/> :
          <span className={css(divCss)} onClick={onLabelClick}  >{label}</span>
        }
        <span className="itemButton ">
          <button className="btn btn-outline-success btn-sm"
                  onClick={onToggleDescription}
                  >
            📑
          </button>
          <button className="btn btn-outline-success btn-sm"
                  onClick={onEditClick} >
            🛠
          </button>
          <button type="button"
                  className="btn btn-outline-success btn-sm"
                  onClick={onDownClick}
                  disabled={isLast}>
            ▼
          </button>
          <button type="button"
                  className="btn btn-outline-success btn-sm"
                  onClick={onUpClick}
                  disabled={isFirst}>
            ▲
          </button>
          <button type="button" className="btn btn-outline-success btn-sm"  onClick={onImportantClick}>
            <i className="fa fa-exclamation"/>
          </button>
          <button type="button" className="btn btn-outline-warning btn-sm " onClick={onDeleteClick}>
             🚽
          </button>

        </span>
      </StyledTodoListItemLabel>
      {isOpenDescription ?
        <span >
          <StyledDescriptionItem  onChange={onChangeDescription}
                     value={editDescription}
                     autoFocus
                     />
        </span> : null

      }

    </StyledTodoListItem>
  )
}

export default TodoListItem
