import React from 'react'
import Modal from "../Modal"
import Input from '../Input'
import {useFormik} from 'formik'
import * as yup from 'yup'
import styled from '@emotion/styled'
import {getId} from '../helper'


interface createAccountProps {
  onClose: any;
  isOpen: boolean;
}

const testLength = (val: any) => {
  return val && (val.length > 2 && val.length < 16)
}

const schema = yup.object().shape({
  userName: yup.string()
  .test('len', 'Name must be min 3, max 15 characters', testLength)
    .required(),
  userSurName: yup.string()
    .test('len', 'Surname must be min 3, max 15 characters', testLength)
    .required(),
  userPassword: yup.string()
  .test('len', 'Password must be min 3, max 15 characters', testLength)
    .required()
})

const initialValues = {
  userName: '',
  userSurName: '',
  userPassword: ''
}

const StyledCreateAccount = styled('div') `
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    & button {
      border-radius: 7px;
      background: darkgray;
    };
    & input {
      margin-bottom: 10px;
    }
`

const CreateAccount: React.FC<createAccountProps> = ({onClose, isOpen}) => {

  const onSubmit = (data: any) => {
    // console.log("__data__", data)
    localStorage.setItem(`${data.userName}: ${data.userPassword}`, getId())

  }
  const formData = useFormik({
    initialValues, onSubmit, validationSchema: schema
  })
  // console.log("__formData.errors__", formData.errors)
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <StyledCreateAccount>
        <Input placeholder="name"
               value={formData.values.userName}
               onChange={formData.handleChange('userName')}
               errors={formData.errors.userName}
               showErrors={formData.touched.userName}/>
        <Input placeholder="surName"
               value={formData.values.userSurName}
               onChange={formData.handleChange('userSurName')}
               errors={formData.errors.userSurName}
               showErrors={formData.touched.userSurName}/>
        <Input placeholder="create a password"
               value={formData.values.userPassword}
               onChange={formData.handleChange('userPassword')}
               errors={formData.errors.userPassword}
               showErrors={formData.touched.userPassword}/>
        <button onClick={formData.handleSubmit as any}
                type="submit">
          Create account
        </button>
      </StyledCreateAccount>
    </Modal>

  )
}

export default CreateAccount
