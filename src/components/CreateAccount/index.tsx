import React from 'react'
import Modal from "../Modal"
import {useFormik} from 'formik'
import * as yup from 'yup'
import './style.css'

interface createAccountProps {
  onClose: any;
  isOpen: boolean;
}

const schema = yup.object().shape({
  userName: yup.string().required(),
  userSurName: yup.string().required(),
  userPassword: yup.string().required()
})

const initialValues = {
  userName: '',
  userSurName: '',
  userPassword: ''
}

const CreateAccount: React.FC<createAccountProps> = ({onClose, isOpen}) => {

  const onSubmit = (data: any) => {
    console.log("__data__", data)

  }
  const formData = useFormik({
    initialValues, onSubmit, validationSchema: schema
  })
  console.log("__formData.errors__", formData.errors)
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="createAccount">
        <input placeholder="name"
               value={formData.values.userName}
               onChange={formData.handleChange('userName')}/>
        <input placeholder="surName"
               value={formData.values.userSurName}
               onChange={formData.handleChange('userSurName')}/>
        <input placeholder="create a password"
               value={formData.values.userPassword}
               onChange={formData.handleChange('userPassword')}/>
        <button onClick={formData.handleSubmit as any}
                type="submit">
          Create account
        </button>
      </div>
    </Modal>

  )
}

export default CreateAccount
