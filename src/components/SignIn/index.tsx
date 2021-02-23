import React from 'react'
import Input from '../Input'
import Modal from '../Modal'
import {useFormik} from 'formik'
import * as yup from 'yup'
import styled from '@emotion/styled'


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

const StyledSignIn = styled('div') `
    margin: 20% auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    & button{
        margin: 0 auto;
        width: 100px;
        border-radius: 7px;
        background: darkgray;
    }
`

const SignIn: React.FC<SignInProps> = ({onClose, isOpen}) => {
    const onSubmit = (data: any) => {
      console.log("_sdfg___", data )
    }
    const formData = useFormik({
      initialValues, onSubmit, validationSchema: schema
    })
   return (

    <Modal onClose={onClose} isOpen={isOpen}>
      <StyledSignIn>
          <Input type="text"
                 placeholder="Login"
                 value={formData.values.userName}
                 onChange={formData.handleChange('userName')}
                 showErrors={formData.touched.userName}
                 errors={formData.errors.userName}/>
          <Input type="password"
                 placeholder="Password"
                 value={formData.values.password}
                 onChange={formData.handleChange('password')}
                 showErrors={formData.touched.password}
                 errors={formData.errors.password}/>
          <button onClick={formData.handleSubmit as any} type="submit">Sign In</button>
      </StyledSignIn>
    </Modal>
  )
}

export default SignIn
