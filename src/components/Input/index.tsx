import React, {Fragment}  from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/css'


interface inputProps extends React.HTMLProps<HTMLInputElement> {
  showErrors?: boolean ;
  errors?: string;

 }


const StyledErrorText = styled('div') `
  background: lightgray;
  font-size: 0.8rem;
`

const Input: React.FC<inputProps> = ({  showErrors, errors, ...props}) => {

  const inputCss = {
    border: showErrors && errors ? '2px solid red' : ' ',
    boxShadow: showErrors && errors ? '-5px -5px 6px 0px rgba(255, 0, 0, 0.6)' : ' '
  }

  return (

    <Fragment >
      <input {...props}
             className={css(inputCss)} />
      {showErrors ?
        <StyledErrorText>
          {errors}
        </StyledErrorText> :
        null}

    </Fragment>
  )
}

export default Input
