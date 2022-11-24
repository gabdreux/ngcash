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




export default function CorpoLogin () {
  return (
    <Card sx={{ backgroundColor: "black", padding: "1em", borderRadius: "10px"}}>



      <CardContent>

          <Box display="flex" justifyContent="center" width="100%">
            <Typography gutterBottom variant="h5" component="div" color="white">
              BEM-VINDO!
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center" width="100%">
            <Typography variant="body2" color="white">
                Faça Login ou Registre-se para continuar!
            </Typography>
          </Box>

      </CardContent>

      <CardContent>
    
        <Box display="flex" justifyContent="center" width="100%">
            <Typography gutterBottom variant="body2" component="div" color="white">
              Username:
            </Typography>
        </Box>

        <Box display="flex" justifyContent="center" width="100%" paddingBottom="2em">
            <InputBase title='Value:' sx={{ backgroundColor: "white", borderRadius: "30px" }}/>
        </Box>


        <Box display="flex" justifyContent="center" width="100%">
            <Typography gutterBottom variant="body2" component="div" color="white">
              Senha:
            </Typography>
        </Box>

        <Box display="flex" justifyContent="center" width="100%">
            <InputBase title='creditedAccountID:' sx={{ backgroundColor: "white", borderRadius: "30px" }}/>
        </Box>


        <ButtonAction titulo='Login'/>


      </CardContent>


    </Card>
  );
}
