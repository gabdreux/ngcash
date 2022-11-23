import React from "react";
import { Container } from "@mui/system";

import Cabeça from "../components/cabeça";
import CorpoHome from "../components/corpoHome";


export const Home: React.FC = () => {
    return (

        <div>
            <Cabeça />
            <Container maxWidth="xl">
             <CorpoHome/>
            </Container>
        </div>
  
    )
  };


