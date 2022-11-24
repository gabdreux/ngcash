
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';


export default function Cabeça () {
  return (

    <Box sx={{ flexGrow: 1, marginBottom: "2em" }}>
      <AppBar position="static"  sx={{backgroundColor: 'black'}}>
        <Toolbar>

          <Box display="flex" justifyContent="space-between" width="100%">

            <Box component="img" src="https://ng.cash/_nuxt/img/logo-ngcash-branco.88c5860.svg" height="2em"/>
            <Box>
              <Button color="inherit">Login</Button>
              <Button color="inherit">SignUp</Button>
              <LogoutIcon/>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>

  );
}

