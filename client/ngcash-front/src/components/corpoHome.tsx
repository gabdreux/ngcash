import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import Box from '@mui/material/Box';


export default function CorpoHome () {
  return (
    <Card sx={{ backgroundColor: "black", padding: "2em"}}>



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
