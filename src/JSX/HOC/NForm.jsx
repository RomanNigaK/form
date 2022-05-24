import React, { useState, useEffect } from 'react';

const NForm = (form) => (Component) => {


    const selectedInputs = () => {

        return document.querySelectorAll(`form[name=${form.formName}] input`);
    }
    const selectedTextareas = () => {
        return document.querySelectorAll(`form[name=${form.formName}] textarea`);
    }

    const countInput = () => {
        let count = {};
        let input = selectedInputs();
        let textarea = selectedTextareas();
        count.input = input.length;
        count.textarea = textarea.length;
        count.all = input.length + textarea.length;
        return count;
    }
    const createdFuncs = (text) => {
        if (typeof (text) !== "string") return "Входные данные не являеьтся строкой"
        let arrFunc = [];
        let count = 0;
        let textFunc = '';

        //let func;
        for (let index = 0; index < text.length; index++) {

            textFunc = textFunc + text[index];
            if (text[index] === "{") {
                count++;
            }
            if (text[index] === "}") {

                count--;
                if (count === 0) {
                    let func = new Function('return ' + textFunc)()
                    arrFunc.push(func);

                    textFunc = '';
                    index++
                }
                if (count < 0) return "Фаил не корректен"
            }
        }
        if (arrFunc.length === 0) return "Фаил не корректен"
        return arrFunc;
    }

    const info = (typeInput) => {
        let filds = {};
        //    console.log(typeInput());
        typeInput().forEach(function (i) {
            filds[i.name] = { value: i.value, visit: false };
            if (i.attributes.validator !== undefined) {
                let arr = createdFuncs(i.attributes.validator.value)
                filds[i.name] = { ...filds[i.name], validator: arr };
            }
        })
        return filds;

    }



    return () => {
        const [dataForm, setDataForm] = useState({ form: { name: form.formName } })
        const [valueCurrent, setValue] = useState('')


        useEffect(() => {
            let formforSet = document.querySelector('form');
            // console.log(formforSet);
            formforSet.setAttribute("name", dataForm.form.name);
        }, [])

        useEffect(() => {


            let dataFormFirst = {
                form: { name: dataForm.form.name },
                generalInput: { count: countInput() },
                filds: {
                    inputs: info(selectedInputs),
                    textareas: info(selectedTextareas)
                }
            }

            setDataForm(dataFormFirst);


        }, [valueCurrent])

        const eventSubmit = (e) => {
            e.preventDefault();
            console.log(dataForm)
        }

        const upDate = (e, action, obj) => {

            if (e.target.localName === 'input') {

                
                switch (action) {
                    case 'onfocus':
                        dataForm.filds.inputs[e.target.name]['visit'] = true;
                        setDataForm(dataForm)
                        return dataForm.filds.inputs[e.target.name]['visit']

                    case 'updatevalue':
                        console.log(e.target.value)
                        dataForm.filds.inputs[e.target.name].value = e.target.value;
                        setDataForm(dataForm)
                        return dataForm.filds.inputs[e.target.name].value;
                    case 'error':
                        console.log(obj)
                        dataForm.filds.inputs[e.target.name].valid = obj.valid;
                        dataForm.filds.inputs[e.target.name].errorMsg = obj.msg;
                        setDataForm(dataForm)
                        return { valid: obj.valid, msg: obj.msg }

                    default:
                        break;
                }


                console.warn(dataForm);

            }
        }

        return <Component eventSubmit={eventSubmit} update={upDate} />
    }
}
export default NForm;