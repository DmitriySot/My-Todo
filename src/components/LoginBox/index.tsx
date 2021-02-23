import React from 'react'
import {SignIn, CreateAccount} from '../index'
import styled from '@emotion/styled'


const StyledLVoginBox = styled('div') `
    display: flex;
    justify-content: flex-end;
    & button {
      margin-inline-start: 10px;
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

      <StyledLVoginBox>

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

      </StyledLVoginBox>

  )
}

export default LoginBox
