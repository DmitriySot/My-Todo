import React from 'react'
import './style.css'

interface todoListItemProps {
  label: string;
  done: boolean;
  important: boolean;
  id: number;
  onDelete: Function;
  onToggleStatus: Function;
}



const TodoListItem: React.FC<todoListItemProps> = ({label, important = false, id, done, onDelete, onToggleStatus}) => {

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


  return (
      <span className='todoListItem done'>
        <span className={styleLabel} onClick={onLabelClick} >{label}</span>
        <span className="itemButton ">
          <button type="button" className="btn btn-outline-success btn-sm"  onClick={onImportantClick}>
            <i className="fa fa-exclamation"/>
          </button>
          <button type="button" className="btn btn-outline-success btn-sm" onClick={onDeleteClick}>
            <i className="fa fa-trash-o"/>
          </button>

        </span>
      </span>
  )
}

export default TodoListItem
