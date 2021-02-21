import React from 'react'
import './style.css'

interface inputProps extends React.HTMLProps<HTMLInputElement> {
  showErrors?: boolean ;
  errors?: string;
 }

const Input: React.FC<inputProps> = ({ showErrors, errors, ...props}) => {

  const getInputClasses = () =>{
    return showErrors && errors ? "inputStyle inputErrors" : 'inputStyle'
  }

  return (

    <div className="input">
      <input {...props} className={getInputClasses()}/>
      {showErrors ?
        <div className="errorText">
          {errors}
        </div> :
        null}

    </div>
  )
}

export default Input
