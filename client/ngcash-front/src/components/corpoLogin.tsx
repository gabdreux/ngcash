import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import CorpoTransactions from './corpoTransactions'
import CorpoExtrato from './corpoExtrato';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import { ButtonAction } from './buttonAction';

import { InputField } from './inputField';
import { useState, useEffect, useContext } from 'react';




export default function CorpoLogin () {

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
            <button type='submit'  name='_action' value={action}>
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
