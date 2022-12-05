import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';


interface Props {
    titulo: string;
    onClick?: (...args: any) => any;
}



export const ButtonAction: React.FC <Props> = ({titulo}) => {
  return (

    <Box display="flex" justifyContent="center" width="100%" marginTop="1em">
        <Stack>
        <Button variant="outlined">
          {titulo}
        </Button>
        </Stack>
    </Box>

  );
};
