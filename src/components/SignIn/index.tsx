import React from 'react'
import Modal from '../Modal'
import './style.css'

interface SignInProps {
  onClose: Function;
  isOpen: boolean
}

const SignIn: React.FC<SignInProps> = ({onClose, isOpen}) => {

   return (

    <Modal onClose={onClose} isOpen={isOpen}>
      <div className='signIn'>
          <input type="text" placeholder="Login" />
          <input type="text" placeholder="Password" />
          <button >Sign In</button>
      </div>
    </Modal>
  )
}

export default SignIn
