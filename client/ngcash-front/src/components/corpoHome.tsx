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
import CorpoMain  from './corpoMain';
import CorpoLogin from './corpoLogin';
import { useState, useEffect } from 'react';
import axios from 'axios';






export default function CorpoHome () {
  
  const [tests, setTests] = useState([]);


  useEffect(() => {
      axios.get("http://localhost:5000/user").then((res) => setTests(res.data)).catch((err) => console.log(err));
  });
  
  
  return (
    <Card sx={{ backgroundColor: "black", padding: "2em", marginBottom: "2em", borderRadius: "10px"}}>



      <Container>
        <Grid container sx={{display: "flex", justifyContent: 'center'}}>
          <Grid item sx={{maxWidth: "15%", marginBottom: "2em"}}>
            <CardMedia
              component="img"
              alt="NGCash Logo"
              image= "https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg"
            />
          </Grid>
        </Grid>
      </Container>




      <CorpoLogin/>


      <div>
        {tests.map((test) => (
          <CorpoMain>{test['userName']}</CorpoMain>
        ))}
      </div>


      <CorpoTransactions/>
      <CorpoExtrato/>





    </Card>
  );
};
