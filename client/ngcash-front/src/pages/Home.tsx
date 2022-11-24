import React from "react";
import { Container } from "@mui/material";
import Cabeça from "../components/cabeça";
import CorpoHome from "../components/corpoHome";
import { Grid } from "@mui/material";



export const Home: React.FC = () => {
    return (

        <div>

            <Cabeça />

            <Container maxWidth="lg">
             <Grid container>
                <Grid item xs={12}>
                    <CorpoHome />
                </Grid>
             </Grid>   
            </Container>

        </div>
  
    )
  };


