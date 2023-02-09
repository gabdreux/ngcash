import React from 'react';
import { useState, useEffect } from 'react';



type InputProps = {

    htmlFor: string,
    label: string,
    type?: string,
    value: any,
    onChange?: (...args: any) => any,
    error?: string,
  
  };



  export function InputField ({
    htmlFor,
    label,
    type = "text",
    value,
    onChange = () => {},
    error= "",
  }: InputProps) {

    const [ errorText, setErrorText ] = useState (error);

    useEffect(() => {
        setErrorText(error)
    }, [error]);

    return (

        <>


          
            <div className="inputBox">
                <p>
                    <label htmlFor={htmlFor}>
                        {label}
                    </label>
                </p>
            </div>


            <div className="inputBox">

                <input

                onChange={ e => {
                    onChange(e)
                    setErrorText('')
                }}
                type={type}
                id={htmlFor}
                name={htmlFor}
                value={value} 

                />

            </div>

            

            <div>
                {errorText || ''}
            </div>


        </>


    )


  };