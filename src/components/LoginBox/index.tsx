import React from 'react'
import {SignIn, CreateAccount} from '../index'
import styled from '@emotion/styled'
import {getMQ, breakpoints} from '../helper'


const StyledLoginBox = styled('div') `
    display: flex;
    justify-content: flex-end;
    & button {
      margin-inline-start: 10px;
    }
    ${getMQ(breakpoints.m, true)} {
      justify-content: center;
    }
`

const LoginBox = () => {

  const [openModal, setOpenModal] = React.useState<string>('')

  const onEnter = (e: any) => {
    console.log("__e.target.name__", e.target.name)
    setOpenModal(e.target.name)

  }
  const onClose = () => {
    setOpenModal('')
  }
  return (

      <StyledLoginBox>

        <button name="enter"
                className=" btn btn-outline-secondary"
                onClick={onEnter}>Sign In

        </button>
        <button name="create"
                className=" btn btn-outline-secondary"
                onClick={onEnter}>Create Account
        </button>
        <SignIn onClose={onClose} isOpen={openModal==="enter"}/>
        <CreateAccount onClose={onClose} isOpen={openModal==="create"}/>

      </StyledLoginBox>

  )
}

export default LoginBox
