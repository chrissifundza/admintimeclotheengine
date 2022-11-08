import React, {useEffect, useState} from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import Axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,SearchBar,} from '@mui/material';
const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    Axios.get("https://admintimeclothengine.herokuapp.com/orders").then((res)=>{
     console.log(res.data) 
    setRows(res.data)
      
    })
  },[]) 

  function ViewOrder(row){
    navigate('/vieworder',{state:{row}})
  }


  let count =0

  return (
    <Box m="20px">
      <Header title="Orders" subtitle="Update an Order" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Paper>
        
      
        <TableContainer>
          <Table sx={{minWidth:650}} aria-label="simple table">
            <TableHead>
              <TableRow >
              <TableCell sx={{fontWeight:"Bold"}} >Order No.</TableCell>
                <TableCell sx={{fontWeight:"Bold"}}>Items Ordered</TableCell>
               
                
                <TableCell sx={{fontWeight:"Bold"}} align="right">Total Amount</TableCell>
                <TableCell sx={{fontWeight:"Bold"}} align="right">Status</TableCell>
                <TableCell sx={{fontWeight:"Bold"}} align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.idorders}>
                  <TableCell >{count=count+1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.Products}
                  </TableCell>
                  <TableCell align="right">R{row.Total}</TableCell>
                  <TableCell align="right">{row.Status}</TableCell>
                  <TableCell align="right"><Button color='secondary' onClick={()=> ViewOrder(row)}>View</Button></TableCell>
                </TableRow> 
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      </Box>
    </Box>
  );
};

export default Invoices;
