import { listingInput } from './BasicInput'
import React, { useState } from 'react';

export const Inpt = (props) => {

    let defaultValue = '';
    if(props.type==="checkbox"){defaultValue="off"}
    let component;
    let typeInpt;
    let patternFunc;
    let inptFunc;

    const cssDefaultinput = {
        active: { bkcolor: "blanchedalmond" },
    }

    props.type ? typeInpt = props.type : console.error("не указан тип поля 'type'");
    console.log(typeInpt)
    inptFunc = listingInput(typeInpt);


    if (typeof (props.component) === 'object') {
        component = props.component[0];
        if (typeof (component) === 'function') {
            inptFunc = component;
        }
        defaultValue = props.component[1]
        if (typeof (defaultValue) !== "string") {
            console.error("The default value should be a string")
        }
    } else {
        if (typeof (props.component) === 'function') {
            inptFunc = props.component;
        }

    }


    const [isVisit, setVisit] = useState(false);

    const checkingDataErrors = (typeValid) => {
        if (typeValid === 'load') {
            if (defaultValue = '') {
                return { msg: '', valid: true }
            }
            if (!props.validator) {
                return { msg: '', valid: true }
            }
        }

        let resultValid = { msg: '', valid: true };
        if (props.validator && isVisit) {
            let isValid = true;

            props.validator.forEach(i => {
                if (isValid) {
                    let textError = i(value);
                    textError.length > 0 ? isValid = false : isValid = true

                    resultValid.msg = (textError);
                    resultValid.valid = textError.length > 0 ? false : true;



                }


            })
        }
        console.log(resultValid)
        return resultValid;

    }

    const [value, setValue] = useState(defaultValue);

    const [err, setError] = useState(checkingDataErrors('load'))

    const typing = (e) => {
        setValue(props.update(e, 'updatevalue'));
        setError({ msg: '', valid: true })

    }
    const focusField = (e) => {
        e.target.style.backgroundColor = cssDefaultinput.active.bkcolor;
        setVisit(props.update(e, 'onfocus'));
    }



    const exitField = (e) => {
        setError(props.update(e, 'error', checkingDataErrors()))
        e.target.style.backgroundColor = ""
        // console.log(err);

    }

    const toggleCheck = (e) => {
        
        if (e.target.value === "off") {
            e.target.value="on"
            setValue(props.update(e, 'updatevalue'))
        } else {
            e.target.value="off"
            setValue(props.update(e, 'updatevalue'))
        }

        
    
      }

    const inputTextPattern = {
        "onChange": typing,
        "onFocus": focusField,
        "onBlur": exitField,
        "value": value,
        "type": props.type,
        "placeholder": props.placeholder,
        "name": props.name,

        "data": { valid: err.valid, visit: isVisit, errorMsg: err.msg }
    }
    if (props.validator) {
        inputTextPattern.validator = props.validator;
    }

    const inputCheckboxPattern = {
        "name": props.name,
        "type": props.type,
        "onClick":toggleCheck,
        "value":value,
        "text":props.text,
        
    }



    switch (typeInpt) {

        case 'text':
            patternFunc = inptFunc(inputTextPattern);
            break;

        case 'checkbox':
            patternFunc = inptFunc(inputCheckboxPattern);
            break;
        default:
            console.error("Не известный тип поля")
            break;
    }


    return (
        <>
            <div>
                {patternFunc}
            </div>
        </>
    )


}

