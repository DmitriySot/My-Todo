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

interface loginBoxProps  {
  onExitClick: Function;
  onUpdate: Function;
}

const LoginBox: React.FC<loginBoxProps> = ({onExitClick, onUpdate}) => {
  const [isLogin, setIsLogin] = React.useState<boolean>(!!getCurrentUser())
  const [openModal, setOpenModal] = React.useState<string>('')

  const onClose = () => {
    setOpenModal('')
    setIsLogin(!!getCurrentUser())

  }

  const onEnter = (e: any) => {
    // console.log("__e.target.name__", e.target.name)
    setOpenModal(e.target.name)
    // onClose()



  }
  const onLogout = () => {
    localStorage.removeItem("currentUser" )
    setIsLogin(false)
    onExitClick()


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
            <SignIn onClose={onClose} isOpen={openModal==="enter"} onUpdate={onUpdate}/>
            <CreateAccount onClose={onClose} isOpen={openModal==="create"}/>
          </>)

        }
      </StyledLoginBox>

  )
}

export default LoginBox
