import React from 'react'
import './style.css'

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



const TodoListItem: React.FC<todoListItemProps> = ({label, description, important = false,
                                                     id, done, onDelete,
                                                     onToggleStatus, onTogglePosition, onEditItem,
                                                   isFirst, isLast}) => {

  const [editItem, setEditItem] = React.useState<string>(label)
  const [editDescription, setEditDescription] = React.useState<string>(description)

  const [isEditMode, setIsEditMode] = React.useState<boolean>(false)

  const [isOpenDescription, setIsOpenDescription] = React.useState<boolean>(false)

  const onDeleteClick = () => {
      console.log("__onDelete__", onDelete)
      onDelete(id)
  }

  const onImportantClick = () => {
      onToggleStatus(id, "important")
  }

  const onLabelClick = () => {
      onToggleStatus(id, "done")
  }
  const styleLabel = React.useMemo(() => {
      let classNames = "todoListItem"
      if(done) classNames += " done"
      if(important) classNames += " important"
      return classNames

  }, [important, done])

  const onDownClick = () => {
    onTogglePosition(id, "down")
  }
  const onUpClick = () => {
    onTogglePosition(id, "up")
  }

  const onEditClick = () => {
    editItem !== label && onEditItem(id, editItem)
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
    <div className='todoListItem '>

      <span className="todoListItemLabel">
        {isEditMode ?
          <input autoFocus
                 placeholder="edit"
                 defaultValue={label}
                 onChange={onInputChange}
                  onKeyDown={onEnterPress}/> :
          <span className={styleLabel} onClick={onLabelClick}  >{label}</span>
        }
        <span className="itemButton ">
          <button className="btn btn-outline-success btn-sm"
                  onClick={onToggleDescription}
                  >
            📑
          </button>
          <button className="btn btn-outline-success btn-sm"
                  onClick={onEditClick}>
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
            {/*<i className="fa fa-trash-o"/>*/}
            🚽
          </button>

        </span>
      </span>
      {isOpenDescription ?
        <span className='todoListItemDescription '>
          <textarea  onChange={onChangeDescription}
                     value={editDescription}
                     autoFocus
                     />
        </span> : null

      }

    </div>
  )
}

export default TodoListItem
