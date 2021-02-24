import React from 'react'
import {SignIn, CreateAccount} from '../index'
import styled from '@emotion/styled'
import {getMQ, breakpoints, getCurrentUser, userNameLogged} from '../helper'


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
  const [isLogin, setIsLogin] = React.useState<boolean>(!!getCurrentUser())

  const [openModal, setOpenModal] = React.useState<string>('')

  const onClose = () => {
    setOpenModal('')
    setIsLogin(!!getCurrentUser())
  }

  const onEnter = (e: any) => {
    console.log("__e.target.name__", e.target.name)
    setOpenModal(e.target.name)


  }
  const onLogout = () => {
    localStorage.setItem("currentUser", `` )
    setIsLogin(false)
  }

  return (

      <StyledLoginBox>
        {isLogin?
          (<>
            <div>
              {`hello ${userNameLogged()}`}
            </div>
            <button name="exit"
                    className=" btn btn-info"
                    onClick={onLogout}>Log Out

            </button>

          </>) :
         ( <>
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
          </>)

        }
      </StyledLoginBox>

  )
}

export default LoginBox
