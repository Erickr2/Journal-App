import { useState } from "react"



export const Useform = (initialForm = {}) => {

    const [FormState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {

        const { name, value } = target;

        setFormState({
            ...FormState,
            [name]: value
        })
    }

    const onReset = () => {
        setFormState(initialForm)
    }


    return {
        ...FormState, //podemos expandir el estado para desestructurarlo directamente y no tener que hacerlo desde mi estado FormState
        FormState,
        onInputChange,
        onReset
    }
}