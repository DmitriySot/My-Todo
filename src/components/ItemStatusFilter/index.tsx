import React from 'react'

interface itemStatusFilterProps {
  onFilter: Function;
  activeFilter: string;
}

const ItemStatusFilter: React.FC<itemStatusFilterProps> = ({onFilter, activeFilter}) => {

  const filterAll = () => {
    onFilter("all")
  }
  const filterDone = () => {
    onFilter("done")
  }
  const filterUndone = () => {
    onFilter("undone")
  }
  const checkIsActive = (filterName: string) => {
    const classes = "btn"
    return filterName === activeFilter ? classes + " btn-info" : classes + " btn-outline-secondary"

  }

  return (
    <div className="btn-group itemStatusFilter ">
      <button onClick={filterAll} type='button' className={checkIsActive("all")}>All</button>
      <button onClick={filterDone} type='button' className={checkIsActive("done")}>Active</button>
      <button onClick={filterUndone} type='button' className={checkIsActive("undone")}>Done</button>
    </div>
  )
}

export default ItemStatusFilter
