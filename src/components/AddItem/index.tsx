import React from 'react'
import  Input from '../Input'
import * as yup from 'yup'
import {useFormik} from 'formik'
import styled from '@emotion/styled'


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
    margin: 10px;
    width: 480px;
    & input {
      width: 70%;
    }
`
const StyledButton = styled('button')`
    width: 25%;
    border-radius: 5px;
    &:hover {
      background: lightgray;
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
    <StyledAddItem>
      <Input
             onChange={formData.handleChange('newItem')}
             value={formData.values.newItem}
             placeholder="Add New Item"
             errors={formData.errors.newItem}
             showErrors={formData.touched.newItem}/>

      <StyledButton onClick={formData.handleSubmit as any}>Add Item</StyledButton>
    </StyledAddItem>

  )
}

export default AddItem
