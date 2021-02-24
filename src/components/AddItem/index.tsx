import React from 'react'
import  Input from '../Input'
import * as yup from 'yup'
import {useFormik} from 'formik'
import styled from '@emotion/styled'
import {breakpoints, getMQ} from '../helper'


interface addItemProps {
  onAddItem: Function;
}

const initialValues = {
  newItem: ''
}

const schema = yup.object().shape({
  newItem: yup.string().required()
})

const StyledAddItem = styled('div')`
    display: flex;
    justify-content: space-between;
    
    & input {
      flex-grow: 4;
    }
    ${getMQ(breakpoints.m, true)} {
      flex-direction: column;
      align-items: center;
      & input {
        width: 100%;
        margin-bottom: 10px;
      }
    }
`
const StyledButton = styled('button')`
   
    margin-left: 10px;
    border-radius: 5px;
    flex-grow: 1;
    min-width: 100px;
    &:hover {
      background: lightgray;
    }
    ${getMQ(breakpoints.m, true)} {
      margin: 0;
      max-width: 50%;
      
    }
`

const AddItem: React.FC<addItemProps>  = ({onAddItem}) => {

  const onSubmit = (data: any) => {
    console.log("__data__", data)
    onAddItem(data.newItem)
    formData.resetForm()
  }

  const formData = useFormik({initialValues, validationSchema: schema, onSubmit})

    return (
    <StyledAddItem >
      <Input
             onChange={formData.handleChange('newItem')}
             value={formData.values.newItem}
             placeholder="Add New Item"
             errors={formData.errors.newItem}
             showErrors={formData.touched.newItem}/>

      <StyledButton className=" btn btn-info"
                    onClick={formData.handleSubmit as any}>Add Item</StyledButton>
    </StyledAddItem>

  )
}

export default AddItem
