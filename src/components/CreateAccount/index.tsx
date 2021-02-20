import React from 'react'
import Modal from "../Modal"
import './style.css'

interface createAccountProps {
  onClose: any;
  isOpen: boolean;
}

const CreateAccount: React.FC<createAccountProps> = ({onClose, isOpen}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="createAccount">
        <input placeholder="name"/>
        <input placeholder="surName"/>
        <input placeholder="create a password"/>
        <button >Create account</button>
      </div>
    </Modal>

  )
}

export default CreateAccount
