import React from 'react'
import {SignIn, CreateAccount} from '../index'
import './style.css'

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

      <div className='loginBox'>

        <button name="enter"
                className="loginBoxButton btn btn-outline-secondary"
                onClick={onEnter}>Sign In

        </button>
        <button name="create"
                className="loginBoxButton btn btn-outline-secondary"
                onClick={onEnter}>Create Account
        </button>
        <SignIn onClose={onClose} isOpen={openModal==="enter"}/>
        <CreateAccount onClose={onClose} isOpen={openModal==="create"}/>

      </div>

  )
}

export default LoginBox
