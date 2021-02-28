import React from 'react'
import styled from '@emotion/styled'
import {css} from '@emotion/css'
import {getMQ, breakpoints, getItemKeyById, getItemFromLocalStorage} from '../helper'

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


interface todoListItemProps {
  label: string;
  description: string;
  done: boolean;
  important: boolean;
  id: number;
  onTogglePosition: Function;
  onUpdate: Function;
  isFirst: boolean;
  isLast: boolean;
  onEditItem: Function;
}

const TodoListItem: React.FC<todoListItemProps> = ({label, description, important = false,
                                                     id, done, onUpdate,
                                                      onTogglePosition, onEditItem,
                                                   isFirst, isLast}) => {

  const [editItem, setEditItem] = React.useState<string>(label)
  const [editDescription, setEditDescription] = React.useState<string>(description)
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false)
  const [isOpenDescription, setIsOpenDescription] = React.useState<boolean>(false)
  const [itemKey, setItemKey] = React.useState<string>('')

  const onDeleteClick = () => {
     const itemKey = getItemKeyById(id)
     localStorage.removeItem(itemKey)
     onUpdate()
  }

  const getId = () => {
    const key = itemKey ||  getItemKeyById(id)
    if(!itemKey) setItemKey(key)
    return key
  }

  const onImportantClick = () => {
      const localStorageItem = JSON.parse(localStorage.getItem(getId()) || '')
      localStorageItem.important = !localStorageItem.important
      localStorage.setItem(getId(), JSON.stringify(localStorageItem))
      onUpdate()
      console.log("__getItem__", localStorageItem.important)
  }

  const onLabelClick = () => {
      const localStorageItem = JSON.parse(localStorage.getItem(getId()) || '')
      localStorageItem.done = !localStorageItem.done
      localStorage.setItem(getId(), JSON.stringify(localStorageItem))
      console.log("__id__", id)
      onUpdate()
  }

  const divCss = {
    textDecoration: done? "line-through" : '',
    color: important? "tomato" : ''
  }

  const onDownClick = () => {
    // const getSortItems = (a: any, b: any) => {
    //   return a.id - b.id
    // }
    // const items = getItemFromLocalStorage()
    // const currentKey = getItemKeyById(id)
    // const sortItems = items.sort(getSortItems)
    // const currentIndex = sortItems.findIndex((item) =>{
    //   return item.id === id
    // })
    // const nextIndex = currentIndex + 1
    // const nextItem = items[nextIndex]
    // const nextId = nextItem.id
    // console.log("__nextItem__", nextId)
    //
    // items[nextIndex].id = id
    // items[currentIndex].id = nextId
    //
    // const nextKey = getItemKeyById(nextId)
    // localStorage.setItem(currentKey, JSON.stringify(items[currentIndex]) )
    // localStorage.setItem(nextKey, JSON.stringify(items[nextIndex]) )
    // console.log("__items__", items)
    // onUpdate()
    //
    // onTogglePosition(id, "down")
    onMoveItem('down')

  }

  const onMoveItem = (sign: "up"| "down") => {

    const getSortItems = (a: any, b: any) => {
      return a.id - b.id
    }
    const items = getItemFromLocalStorage()
    const currentKey = getItemKeyById(id)
    const sortItems = items.sort(getSortItems)
    const currentIndex = sortItems.findIndex((item) =>{
      return item.id === id
    })

    const nextIndex = sign === 'up'? currentIndex - 1 : currentIndex + 1
    const nextItem = items[nextIndex]
    const nextId = nextItem.id
    console.log("__nextItem__", nextId)

    items[nextIndex].id = id
    items[currentIndex].id = nextId

    const nextKey = getItemKeyById(nextId)
    localStorage.setItem(currentKey, JSON.stringify(items[currentIndex]) )
    localStorage.setItem(nextKey, JSON.stringify(items[nextIndex]) )
    console.log("__items__", items)
    onUpdate()
  }

  const onUpClick = () => {
    onMoveItem("up")
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
