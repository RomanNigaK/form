import React from 'react';
import style from './style.module.css';

const Input = ({data,...props}) => {
  //console.log(props)
  //console.warn(data)
 
  return (
    <>
      <div>
        
        <input  {...props} className={style.input} />
        <div className={style.error}>
        {!data.valid&&data.visit?data.errorMsg:""}
        </div>
        

      </div>
    </>
  )
}
export default Input;