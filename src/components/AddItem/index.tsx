import React from 'react'
import  Input from '../Input'
import * as yup from 'yup'
import {useFormik} from 'formik'
import styled from '@emotion/styled'
import {breakpoints, getMQ, DEFAULT_USER, getCurrentUser, getDefaultDataItem} from '../helper'

const StyledAddItem = styled('div')`
    display: flex;
    justify-content: space-between;
    
    
`
const StyledWrapInput = styled('div') `
   
    flex-grow: 4;
    & input {
      width: 100%;
      height: 38px;
      
    }
`
const StyledButton = styled('button')`
    margin-left: 10px;
    border-radius: 5px;
    flex-grow: 1;
    height: 38px;
    min-width: 100px;
    &:hover {
      background: gray;
    }
    ${getMQ(breakpoints.m, true)} {
      max-width: 50%;
    }
`

interface addItemProps {
  onUpdate: Function;
}

const initialValues = {
  newItem: ''
}

const testLength = (val: any) => {
  return val && (val.length > 2 && val.length < 20)
}

const schema = yup.object().shape({
  newItem: yup.string()
    .test('len', "New item must be min 3 and max 19 characters", testLength)
    .required()
})


const AddItem: React.FC<addItemProps>  = ({onUpdate}) => {

  const onSubmit = (data: any) => {
    const currentUser = getCurrentUser()
    const getUserKey = localStorage.getItem(currentUser || '')
    const newItem = getDefaultDataItem(data.newItem)

    if(getUserKey){
      localStorage.setItem(getUserKey + ':' + Date.now(), JSON.stringify(newItem))
    } else {
      localStorage.setItem(DEFAULT_USER + ':' + Date.now(), JSON.stringify(newItem))
    }
    formData.resetForm()
    console.log("__Object.entries(localStorage)__", Object.entries(localStorage))
    onUpdate()
  }

  const formData = useFormik({initialValues, validationSchema: schema, onSubmit})

    return (
    <StyledAddItem >
      <StyledWrapInput>
        <Input
               onChange={formData.handleChange('newItem')}
               value={formData.values.newItem}
               placeholder="Add New Item"
               errors={formData.errors.newItem}
               showErrors={formData.touched.newItem}/>

      </StyledWrapInput>

      <StyledButton className=" btn btn-info"
                    onClick={formData.handleSubmit as any}>Add Item
      </StyledButton>
    </StyledAddItem>

  )
}

export default AddItem
