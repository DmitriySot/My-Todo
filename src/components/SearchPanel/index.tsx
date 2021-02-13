import React from 'react'
import './style.css'

interface searchPanelProps {
    onSearch: Function;
}

const SearchPanel: React.FC<searchPanelProps> = ({onSearch}) => {

  const onSearchTodo = (e: any) => {
    const {value} = e.target
    console.log("__value__", value)
    onSearch(value)
  }

  return (
    <input className="searchPanel" placeholder="search" onChange={onSearchTodo}/>
  )
}

export default SearchPanel
