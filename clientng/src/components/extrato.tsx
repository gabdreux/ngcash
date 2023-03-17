import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { CardActions, Box, Button, Typography } from '@mui/material';
import { format } from "date-fns";
import axios from '../api/axios';

const formatDate = (params: GridValueFormatterParams): string => {
  const date = new Date(params.value as string);
  console.log(date);
  return format(date, 'dd/MMM');
};

const userData = JSON.parse(
  typeof sessionStorage !== 'undefined'
    ? sessionStorage.getItem('user') || '{}'
    : '{}'
);
const userAccountId = parseInt(userData?.accountId || '1', 10);

const columns: GridColDef[] = [
  { 
    field: 'createdAt', 
    headerName: 'Data', 
    width: 200, 
    valueFormatter: formatDate,
    cellClassName: (params) => {
      return params.row.sourceId === userAccountId ? 'red-text' : 'green-text';
    },
  },
  {
    field: 'sourceId',
    headerName: 'De:',
    width: 230,
    cellClassName: (params) => {
      return params.value === userAccountId ? 'red-text' : 'green-text';
    },
  },
  { 
    field: 'destinationId', 
    headerName: 'Para:', 
    width: 230,
    cellClassName: (params) => {
      return params.row.sourceId === userAccountId ? 'red-text' : 'green-text';
    },
  },
  { 
    field: 'value', 
    headerName: 'Valor', 
    width: 170,
    cellClassName: (params) => {
      return params.row.sourceId === userAccountId ? 'red-text' : 'green-text';
    },
  },
];

export default function DataTable() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
        const userAccountId = parseInt(userData?.accountId || '0', 10);
        console.log('User account id do Extrato:', userAccountId);
        const response = await axios.get('/transactions', {
          params: {
            accountId: userAccountId,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "1em" }} className="tableBox">
      <Box display="flex" justifyContent="center" width="100%" marginBottom="1em">
        <Typography gutterBottom variant="h5" component="div" color="white">
          EXTRATO:
        </Typography>
      </Box>
      <DataGrid
        rows={transactions}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        style={{ height: 400, width: '100%', backgroundColor: "white", borderRadius: "10px" }}
      />
    </div>
  );
}
