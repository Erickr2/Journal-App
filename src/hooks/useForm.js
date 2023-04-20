import { useEffect, useMemo, useState } from "react"



export const Useform = (initialForm = {}, formValidations = {}) => {

    const [FormState, setFormState] = useState(initialForm);
    const [FormValidation, setFormValidation] = useState({});

    //cada que el estado del formulario cambie, renderiza createValidations
    useEffect( () => {
        createValidators();
    }, [FormState]);

    //usamos un memo para memorizar el valor del formsate
    const isFormValid = useMemo( () => {
        for (const formValue of Object.keys( FormValidation )) { //barremos nuestro FormValidation y revisamos si las propiedades estan en null, si no lo estan se regresa un true
            if(FormValidation[formValue] !== null) return false;

            return true;
        }
    }, [FormValidation]) //cada que cambie formValidation

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

    const createValidators = () => {

        const formCheckedValues ={}; //declaro un objeto vacio

        //recorro las propiedades de mi objeto formValidations
        for (const formField of Object.keys( formValidations )) {
            const [fn, errorMessage] = formValidations[formField]; //extraigo los argumentos de mi formValidations

            formCheckedValues[`${ formField }Valid`] = fn( FormState[formField]) ? null : errorMessage; //si los valores de mis input devuelven verdadero, no manda mensaje, caso contrario errorMesagge
        }

        setFormValidation( formCheckedValues ); //mandamos los nuevos valores validados
    }


    return {
        ...FormState, //podemos expandir el estado para desestructurarlo directamente y no tener que hacerlo desde mi estado FormState
        FormState,
        onInputChange,
        onReset, 
        ...FormValidation,
        isFormValid
    }
}