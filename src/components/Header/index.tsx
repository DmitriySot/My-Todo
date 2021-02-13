import React from 'react'
import './style.css'

interface headerProps {
  active: number;
  done: number;
}

const Header: React.FC<headerProps> = ({done, active}) => {
  return (
      <div className="header">
        <h1>My Todo List</h1>
        <h2>{active} More todo {done} done</h2>
      </div>
  )
}

export default Header
