import React from 'react'
import styled from '@emotion/styled'

interface searchPanelProps {
    onSearch: Function;
}

const StyledSearchPanel = styled('input') `
    width: 60%;
    height: 38px;
    margin-right: 10px;
`
const SearchPanel: React.FC<searchPanelProps> = ({onSearch}) => {

  const onSearchTodo = (e: any) => {
    const {value} = e.target
    console.log("__value__", value)
    onSearch(value)
  }

  return (
    <StyledSearchPanel placeholder="search" onChange={onSearchTodo}/>
  )
}

export default SearchPanel
