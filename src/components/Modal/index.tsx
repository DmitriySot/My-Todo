import React from 'react'
import {SignIn, CreateAccount} from "../index";
import styled from '@emotion/styled'

interface ModalProps {
  onClose: any;
  isOpen: boolean;
}

const StyledModalWindow = styled('div') `
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: darkgoldenrod;
    z-index: 9998;
    opacity: 50%;
`
const StyledCloseModal = styled('button' ) `
    position: fixed;
    right: 10px;
    top: 10px;
`
const StyledItem = styled('div') `
    padding: 20px;
    left: 20%;
    top: 30%;
    position: fixed;
    width: 60%;
    border-radius: 3%;
    background: darkgray ;
    z-index: 9999;
`

const Modal: React.FC<ModalProps> = ({children, isOpen, onClose}) => {

  if(!isOpen) return null
  return (
    <>
    <StyledModalWindow>
      <StyledCloseModal
              onClick={onClose}>
        ✕
      </StyledCloseModal>
    </StyledModalWindow>

    <StyledItem>
      {children}
    </StyledItem>

    </>
  )
}

export default Modal
