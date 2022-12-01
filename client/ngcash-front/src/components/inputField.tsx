import { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


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



            <Box display="flex" justifyContent="center" width="100%">
                <Typography gutterBottom variant="body2" component="div" color="white">
                    <label htmlFor={htmlFor}>
                        {label}
                    </label>
                </Typography>
            </Box>


            <Box display="flex" justifyContent="center" width="100%" paddingBottom="1em">

                <InputBase
                sx={{ backgroundColor: "white", borderRadius: "30px", paddingLeft: "1em" }}

                
                onChange={ e => {
                    onChange(e)
                    setErrorText('')
                }}
                type={type}
                id={htmlFor}
                name={htmlFor}
                value={value} 

                />

            </Box>

            

            <div>
                {errorText || ''}
            </div>


        </>


    )


  };