import React from 'react'
import {SignIn, CreateAccount} from "../index";
import './style.css'

interface ModalProps {
  onClose: any;
  isOpen: boolean;
}
// : React.FC<addItemProps>  = ({onAddItem})
const Modal: React.FC<ModalProps> = ({children, isOpen, onClose}) => {

  if(!isOpen) return null
  return (
    <>
    <div className="modalWindow">
      <button className="closeModal "
              onClick={onClose}>
        ✕
      </button>
    </div>

    <div className='item1'>
      {children}
    </div>

    </>
  )
}

export default Modal
