import React from 'react'
import styled from '@emotion/styled'
import {getMQ, breakpoints} from '../helper'


interface headerProps {
  active: number;
  done: number;
}

const StyledHeader = styled('div') `
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline ;
    & h2{
       font-size: 1.2rem;
    }
    ${getMQ(breakpoints.s)} {
      flex-direction: column;
      align-items: center;
    }
    ${getMQ(breakpoints.m)} {
      flex-direction: row;
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
