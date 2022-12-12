import * as React from 'react';
import {Card, CardMedia } from '@mui/material/';
import { Container, Grid } from '@mui/material';
import CorpoLogin from './corpoLogin';


export default function CorpoHome () {
  
  // const [tests, setTests] = useState([]);


  // useEffect(() => {
  //     axios.get("http://localhost:5000/user").then((res) => setTests(res.data)).catch((err) => console.log(err));
  // });
  
  
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


      {/* <div>
        {tests.map((test) => (
          <CorpoMain>{test['userName']}</CorpoMain>
        ))}
      </div>


      <CorpoTransactions/>
      <CorpoExtrato/> */}





    </Card>
  );
};
