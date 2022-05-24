import React from 'react';
import { Inpt } from '../HOC/Inpt';
import NForm from '../HOC/NForm';
import { email, required } from './../HOC/validators'
import Input from './../HOC/Input'
import style from './style.module.css'
import Checkbox from './../HOC/checkbox'




const Registration = (props) => {



  return (
    <div className={style.form}>
      {/* <Checkbox/> */}

      <form onSubmit={props.eventSubmit} >
        <div className={style.titleForm}>Представтесь</div>
        <Inpt type="text" name='name' placeholder='Name'
          component={Input}
          validator={[required]}
          update={props.update} />
        <br />
        <Inpt type="text" name='email' placeholder='example@mail.ru'
          component={Input}
          validator={[email, required]}
          update={props.update} />
        <br />
        <Inpt type="checkbox" name='rememberme'
          component={Checkbox}
          text="Запомнить меня"
          update={props.update} />
        <br />

        <br />
        <input type="submit" name='submit' value="Send" />

      </form>
    </div>
  )
}

const Example = NForm({ formName: "Example" })(Registration)
export default Example;




