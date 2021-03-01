import React from 'react'
import Input from '../Input'
import Modal from '../Modal'
import {useFormik} from 'formik'
import * as yup from 'yup'
import styled from '@emotion/styled'
import {getCurrentUser} from '../helper'


interface SignInProps {
  onClose: Function;
  isOpen: boolean;
  onUpdate: Function;
}
const testLength = (val: any) => {
  console.log("__val__", val)

   return val && (val.length > 2 &&  val.length < 16)
}
const schema = yup.object().shape({
  userName: yup.string()
   .required()
    .test('len', 'UserName must be min 3, max 15 characters', testLength),
  password: yup.string()
    .test('len', 'Password must be min 3, max 15 characters', testLength)
    .required()
})

const initialValues = {
  userName: '',
  password: '',
}

const StyledSignIn = styled('div') `
    margin: 15px auto;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    & button{
        margin: 0 auto;
        width: 100px;
        border-radius: 7px;
        background: darkgray;
    };
    & input {
      margin-bottom: 10px;
    }
`

const SignIn: React.FC<SignInProps> = ({onClose, isOpen, onUpdate}) => {
    const onSubmit = (data: any) => {
      //console.log("_sdfg___", data )
      const user1 = localStorage.getItem(`${data.userName}: ${data.password}`)
      if(user1)  {
        localStorage.setItem(`currentUser` ,`${data.userName}: ${data.password}`)
        onClose()

      }

      //console.log("__user1__", user1)
      onUpdate()
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
