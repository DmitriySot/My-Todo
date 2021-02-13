import React from 'react'
import './style.css'

interface addItemProps {
  onAddItem: Function;
}



const AddItem: React.FC<addItemProps>  = ({onAddItem}) => {

  const[newItem, setNewItem] = React.useState<string>('')

  const onchangeItem = (e: any) => {
    setNewItem(e.target.value)
  }
  const onSubmit = () => {
    if( !(newItem || '').trim() ) return
    console.log("__newItem__", newItem)
    onAddItem(newItem)
    setNewItem('')
  }

  return (
    <div className="addItem">
      <input onChange={onchangeItem} value={newItem} placeholder="Add New Item"/>
      <button onClick={onSubmit}>Add Item</button>
    </div>

  )
}

export default AddItem
