import React, {Fragment}  from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/css'


interface inputProps extends React.HTMLProps<HTMLInputElement> {
  showErrors?: boolean ;
  errors?: string;

 }


const StyledErrorText = styled('div') `
  width: 120%;
  font-size: 0.7rem;
  margin-bottom: 25px;
`

const Input: React.FC<inputProps> = ({  showErrors, errors, ...props}) => {

  const inputCss = {
    width: '120%',
    border: showErrors && errors ? '2px solid red' : '',
    boxShadow: showErrors && errors ? '-5px -5px 6px 0px rgba(255, 0, 0, 0.6)' : ' '
  }

  return (

    <Fragment >
      <input {...props}
             className={css(inputCss)} />
      {showErrors && errors ?
        <StyledErrorText>
          {errors}
        </StyledErrorText> :
        null}

    </Fragment>
  )
}

export default Input
