import { useState } from 'react';
import {luhn} from '@dp/luhn';

export default function useFormControls() {
  
    const handleAddNewCard = async (fieldValues = values) => {

        const endpoint = process.env.REACT_APP_API_URL + `/card`

        const res = await fetch(endpoint, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fieldValues)
        }
        );

        const resJson = await res.json();

        if ( ! res.ok ) {
            throw new Error(`Adding new card failed: ${resJson.message ?? res.statusText}`);
        }

        return resJson;
    }

    const initialFormValues = {
      name: "",
      number: "",
      limit: "",
      formSubmitted: false,
      success: false
    }

    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({} as any);

    const validate: any = (fieldValues = values) => {
      let temp: any = { ...errors }
  
      if ("name" in fieldValues) {
        temp.name = fieldValues.name ? "" : "This field is required."
      }
  
      if ("number" in fieldValues) {
        temp.number = fieldValues.number ? "" : "This field is required."
        if (fieldValues.number) {
          temp.number = fieldValues.number.length <= 19
          ? ""
          : "Number is too long"
        }
        if (fieldValues.number) {
            temp.number = luhn(fieldValues.number.toString())
            ? ""
            : "Number is not valid"
        }
      }
  
      if ("limit" in fieldValues) {
        temp.limit = fieldValues.limit ? "" : "This field is required."
      }
  
      setErrors({
        ...temp
      });
    }
    
    const handleInputValue = (e: any) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value
      });
      validate({ [name]: value });
    };


    const formIsValid = (fieldValues = values) => {
      const isValid =
        fieldValues.name &&
        fieldValues.number &&
        fieldValues.limit &&
        Object.values(errors).every((x) => x === "");
  
      return isValid;
    };

   return {
      handleInputValue,
      formIsValid,
      handleAddNewCard,
      errors
    };
  }