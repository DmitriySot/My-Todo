import React from 'react'
import './style.css'

interface searchPanelProps {

}

const onSearchTodo = (e: any) => {
  const {value} = e.target
  console.log("__value__", value)
}

const SearchPanel: React.FC<searchPanelProps> = () => {
  return (
    <input className="searchPanel" placeholder="search" onChange={onSearchTodo}/>
  )
}

export default SearchPanel
