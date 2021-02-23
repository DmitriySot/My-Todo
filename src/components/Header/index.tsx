import React from 'react'
import styled from '@emotion/styled'


interface headerProps {
  active: number;
  done: number;
}

const StyledHeader = styled('div') `
      width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: baseline ;
    padding-inline-start: 10px;
    & h2{
       font-size: 1.2rem;
    }
`

const Header: React.FC<headerProps> = ({done, active}) => {
  return (
      <StyledHeader>
        <h1>My Todo List</h1>
        <h2>{active} More todo {done} done</h2>
      </StyledHeader>
  )
}

export default Header
