import React, {useEffect, useState} from 'react';
import { Box, Button, ButtonGroup, Link, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import Axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,SearchBar,} from '@mui/material';
import { async } from '@firebase/util';
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ResPro, setPro] = useState([]);

  const navigate = useNavigate();
  
   
    
      const [rows, setRows] = useState([]);

      const [searched, setSearched] = useState("");
    
      const requestSearch = (searchedVal) => {
      /*  const filteredRows = originalRows.filter((row) => {
          return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });*/
       // setRows(filteredRows);
      };
    
      const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
      };
      
      useEffect(()=>{
        Axios.get("https://admintimeclothengine.herokuapp.com/user").then((res)=>{
         console.log(res.data) 
        setRows(res.data)
          
        })
      },[]) 
      let count =0

      function ViewUser(row){
        navigate('/viewuser',{state:{row}})
      }

     async function DeleteUser(id){
      console.log(id);
         
          Axios.delete('https://admintimeclothengine.herokuapp.com/deleteuser/'+id).then((response)=>{
           window.location.reload()
          })
 
      }
  return (
    <Box m="20px">
      <Header title="ALL USERS" subtitle="Managing the Team Members" />
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
              <TableCell sx={{fontWeight:"Bold"}} >Name</TableCell>
                <TableCell sx={{fontWeight:"Bold"}}>Surname</TableCell>
               
                
                <TableCell sx={{fontWeight:"Bold"}} >Email</TableCell>
                <TableCell sx={{fontWeight:"Bold"}} align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.idusers}>
                  <TableCell >{count=count+1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.Name}
                  </TableCell>
                  <TableCell >{row.LastName}</TableCell>
                  <TableCell >{row.Email}</TableCell>
                  <TableCell ><Button color='secondary' onClick={()=> ViewUser(row)}>View</Button> <Button color='error' onClick={()=>DeleteUser(row.idusers)}>Delete</Button></TableCell>
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

export default Team;
