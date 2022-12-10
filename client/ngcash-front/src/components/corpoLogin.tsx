import * as React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';




import { InputField } from './inputField';
import { useState} from 'react';

import axios from 'axios';






export default function CorpoLogin () {


  const [tests, setTests] = useState('');
  
  const handleSubmit = async (userName: string,  password: string) => {
    console.log(userName, password);
   
   const result =  await axios.get(`http://localhost:5000/user/:${userName}`)
   const { data } = result;
    console.log(data);

  //  .then((res) => console.log({ res }))

  //  .catch((err) => console.log('Usuário não encontrado'));
    // console.log(tests);
  }

  const [action, setAction] = useState('login');


  const [formData, setFormData] = useState ({

    userName: '',
    password: '',

  })



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {

    setFormData( form => ({
      ...form,
      [field]: event.target.value
    }))

  }


  return (


    <Card sx={{ backgroundColor: "black", padding: "1em", borderRadius: "10px"}}>



      <CardContent>

        <Box display="flex" justifyContent="center" width="100%">
          <Typography gutterBottom variant="h5" component="div" color="white">
            BEM-VINDO!
          </Typography>
        </Box>


        <Box display="flex" justifyContent="center" width="100%" paddingBottom="2em">
          <Typography variant="body2" color="white">
             { action === 'login' ? 'FAÇA O LOGIN PARA CONTINUAR' : 'REGISTRE-SE PARA COMEÇAR'}
          </Typography>
        </Box>


        

        
        {/* <Card sx={{ backgroundColor: "white", padding: "1em", borderRadius: "10px"}}>
          {
            JSON.stringify(formData)
          }
        </Card>
  */}




        <form>

          <InputField
          
          htmlFor='userName'
          label='Username:'
          value={formData.userName}
          onChange={e => handleInputChange(e, 'userName')}
          
          />

          <InputField
          
          htmlFor='password'
          label='Senha:'
          type="password"
          value={formData.password}
          onChange={e => handleInputChange(e, 'password')}
          
          />

{/* 
          {

            action !== 'login' ? <>
             
              <InputField
          
              htmlFor='name'
              label='Primeiro nome:'
              value={formData.name}
              onChange={e => handleInputChange(e, 'name')}
              
              />

            </>: null

          }; */}
          
          <Box display="flex" justifyContent="center" width="100%" marginTop="1em">
            <button 
              type='button'  
              name='_action' 
              value={action}
              onClick={() => {
                handleSubmit(formData.userName, formData.password);
              }}>
            { action === 'login' ? 'LOGIN' : 'SIGN UP'}
            </button>
          </Box>

        </form>


        


        <Box display="flex" justifyContent="center" width="100%" marginTop="1em">

          <Button onClick={ () => setAction(action === 'login' ? 'login' : 'login')}>SIGN IN</Button>
          <Typography variant="h6" color="white">
            |
          </Typography>
          <Button onClick={ () => setAction(action === 'login' ? 'register' : 'register')}>SIGN UP</Button>

        </Box>


      </CardContent>

    </Card>



  );
}
