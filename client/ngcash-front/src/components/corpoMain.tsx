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
import { text } from 'stream/consumers';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { PropsWithChildren } from "react";




///////////////////////////////////////////////

export type UsersTypes = {
  id: number;
  name: string;
  status: boolean;
};

export type ListProps = {

  user : UsersTypes;

};


export default function CorpoMain (props: PropsWithChildren) {



  return (

    <Card sx={{ backgroundColor: "black", padding: "1em", borderRadius: "10px"}}>






    <CardContent>


        <Box display="flex" justifyContent="center" width="100%">

          <Typography gutterBottom variant="h5" component="div" color="white">
            {props.children}
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



  )

};




