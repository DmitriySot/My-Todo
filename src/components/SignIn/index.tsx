import React from 'react'
import Modal from '../Modal'
import {useFormik} from 'formik'
import * as yup from 'yup'

import './style.css'

interface SignInProps {
  onClose: Function;
  isOpen: boolean
}
const schema = yup.object().shape({
  userName: yup.string().required(),
  password: yup.string().required()
})

const initialValues = {
  userName: '',
  password: '',
}

const SignIn: React.FC<SignInProps> = ({onClose, isOpen}) => {
    const onSubmit = (data: any) => {
      console.log("_sdfg___", data )
    }
    const formData = useFormik({
      initialValues, onSubmit, validationSchema: schema
    })
   return (

    <Modal onClose={onClose} isOpen={isOpen}>
      <div className='signIn'>
          <input type="text"
                 placeholder="Login"
                 value={formData.values.userName}
                 onChange={formData.handleChange('userName')}/>
          <input type="text"
                 placeholder="Password"
                 value={formData.values.password}
                 onChange={formData.handleChange('password')} />
          <button onClick={formData.handleSubmit as any} type="submit">Sign In</button>
      </div>
    </Modal>
  )
}

export default SignIn
