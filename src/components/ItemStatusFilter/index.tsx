import React from 'react'
import styled from '@emotion/styled'

interface itemStatusFilterProps {
  onFilter: Function;
  activeFilter: string;
}

const StyledFilter = styled('div')`
  flex-grow: 0.5;
`

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
    <StyledFilter className="btn-group ">
      <button onClick={filterAll} type='button' className={checkIsActive("all")}>All</button>
      <button onClick={filterDone} type='button' className={checkIsActive("done")}>Active</button>
      <button onClick={filterUndone} type='button' className={checkIsActive("undone")}>Done</button>
    </StyledFilter>
  )
}

export default ItemStatusFilter
