import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';


export default function CorpoTransactions () {
  return (
    <Card sx={{ backgroundColor: "black", padding: "2em"}}>


      <CardContent>

        <Box display="flex" justifyContent="center" width="100%" paddingBottom="2em">
            <Typography gutterBottom variant="h5" component="div" color="white">
              TRANSAÇÃO
            </Typography>
        </Box>
        

        <Box display="flex" justifyContent="center" width="100%">
            <Typography gutterBottom variant="body2" component="div" color="white">
              Valor:
            </Typography>
        </Box>

        <Box display="flex" justifyContent="center" width="100%" paddingBottom="2em">
            <InputBase title='Value:' sx={{ backgroundColor: "white", borderRadius: "30px" }}/>
        </Box>


        <Box display="flex" justifyContent="center" width="100%">
            <Typography gutterBottom variant="body2" component="div" color="white">
              Conta para depósito:
            </Typography>
        </Box>

        <Box display="flex" justifyContent="center" width="100%">
            <InputBase title='creditedAccountID:' sx={{ backgroundColor: "white", borderRadius: "30px" }}/>
        </Box>


      </CardContent>


    </Card>
  );
}
