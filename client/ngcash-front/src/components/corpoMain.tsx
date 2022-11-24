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




export default function CorpoMain () {
  return (
    <Card sx={{ backgroundColor: "black", padding: "1em", borderRadius: "10px"}}>

      <CardContent>

          <Box display="flex" justifyContent="center" width="100%">
            <Typography gutterBottom variant="h5" component="div" color="white">
              Olá, User!
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center" width="100%">
            <Typography variant="body2" color="white">
                Seu balcanço atual é de:
            </Typography>
          </Box>

      </CardContent>



      <CardActions>
        <Button size="small">Extrato</Button>
        <Button size="small">Operações</Button>
      </CardActions>


    </Card>
  );
}
