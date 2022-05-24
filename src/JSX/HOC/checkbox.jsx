import React, { useState } from 'react';
import style from './style.module.css';



const Checkbox = ({ data, ...props }) => {



  return (
    <>
      
      <input {...props}  id="check"  className={style.customCheckbox}  />
      <label for="check" >{props.text}</label>

    </>
  )
}
export default Checkbox;