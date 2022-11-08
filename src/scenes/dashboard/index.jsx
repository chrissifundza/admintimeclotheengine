import { useEffect, useState } from "react";
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { getAuth, signOut } from "firebase/auth";
import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Axios from 'axios';
import { saveAs } from 'file-saver';
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate= useNavigate();
  const [TotalUsers, setTotalUsers] = useState(0)
  const [TotalShops, setTotalShops] = useState(0)
  const [TotalOrders, setTotalOrders] = useState(0)
  const [TotalProducts, setTotalProducts] = useState(0)
  const [Orders, setOrders] = useState([])
  const [AllShops, setAllShops] = useState([])
  const [AllUsers, setAllusers] = useState([])
  const [AllProducts, setAllProducts] = useState([])
  
function signout(){
  const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/')
    }).catch((error) => {
      // An error happened.
      swal('Error',error.message,'error')
    });
}

useEffect(()=>{
  Axios.get("https://admintimeclothengine.herokuapp.com/user").then((res)=>{
   console.log(res.data) 
  setTotalUsers(res.data.length)
  setAllusers(res.data)
  })
},[]) 

useEffect(()=>{
  
    //const querySnapshot = await getDocs(collection(db, "Shops"));
    Axios.get("https://admintimeclothengine.herokuapp.com/shops").then((response)=>{
     let querySnapshot= response.data
     setTotalShops(querySnapshot.length)
     setAllShops(response.data)
  })
  
  
},[])

useEffect(()=>{
  Axios.get("https://admintimeclothengine.herokuapp.com/orders").then((res)=>{
   console.log(res.data) 
   setTotalOrders(res.data.length)
   setOrders(res.data)
  })
},[]) 

useEffect(()=>{
  Axios.get("https://admintimeclothengine.herokuapp.com/products").then((res)=>{
   console.log(res.data) 
   setTotalProducts(res.data.length)
   setAllProducts(res.data)
  })
},[]) 

function generatePdf(){
  
  Axios.post('https://admintimeclothengine.herokuapp.com/create-pdf', AllShops)
  .then(() => Axios.get('https://admintimeclothengine.herokuapp.com/fetch-pdf', { responseType: 'blob' }))
  .then((res) => {
    const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

    saveAs(pdfBlob, 'AllShopsReport.pdf');
  })
}
function getAllUsers(){
  Axios.post('https://admintimeclothengine.herokuapp.com/user-pdf', AllUsers)
  .then(() => Axios.get('https://admintimeclothengine.herokuapp.com/user-pdf', { responseType: 'blob' }))
  .then((res) => {
    const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

    saveAs(pdfBlob, 'AllUsersReport.pdf');
  })
}
function getAllProducts(){
  Axios.post('https://admintimeclothengine.herokuapp.com/product-pdf', AllProducts)
  .then(() => Axios.get('https://admintimeclothengine.herokuapp.com/product-pdf', { responseType: 'blob' }))
  .then((res) => {
    const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

    saveAs(pdfBlob, 'AllProductsReport.pdf');
  })
}

function getAllOrders(){
  Axios.post('https://admintimeclothengine.herokuapp.com/order-pdf', Orders)
  .then(() => Axios.get('https://admintimeclothengine.herokuapp.com/order-pdf', { responseType: 'blob' }))
  .then((res) => {
    const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

    saveAs(pdfBlob, 'AllOrdersReport.pdf');
  })
}
let count =0
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={signout}
          >
            
            Logout
          </Button>
          
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{cursor:"pointer"}}
          onClick={getAllUsers}
        >
          <StatBox
            title={TotalUsers}
            subtitle="Total Users"
           
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{cursor:"pointer"}}
          onClick={generatePdf}
        >
          <StatBox
            title={TotalShops}
            subtitle="Total Shops"
           
            icon={
              <AddBusinessIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{cursor:"pointer"}}
          onClick={getAllProducts}
        >
          <StatBox
  
            title={TotalProducts}
            subtitle="Shops Products"
           
            icon={
              <ContactsOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
       
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{cursor:"pointer"}}
          onClick={getAllOrders}
        >
          <StatBox
            title={TotalOrders}
            subtitle="Total Orders"
            
            icon={
              <ReceiptOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                All Shops
              </Typography>
             
            </Box>
            <Box>
              <IconButton onClick={generatePdf}>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Paper>
        
      
        <TableContainer sx={{maxheight:50}} color={colors.primary[400]}  backgroundColor={colors.primary[400]}>
          <Table sx={{minWidth:650}}  color={colors.primary[400]} aria-label="simple table"  >
            <TableHead>
              <TableRow >
              <TableCell sx={{fontWeight:"Bold"}} >Shop No.</TableCell>
              <TableCell sx={{fontWeight:"Bold"}} >Shop Name</TableCell>
                <TableCell sx={{fontWeight:"Bold"}}>Shop Location</TableCell>
               
                
                
              </TableRow>
            </TableHead>
            <TableBody>
              {AllShops.map((row, index) => (
                <TableRow key={row.idshops}>
                  <TableCell >{count=count+1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.ShopName}
                  </TableCell>
                  <TableCell >{row.ShortAddress}</TableCell>
                 </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {Orders.map((transaction, i) => (
            <Box
              key={transaction.idorders}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.idorders}
                </Typography>
                <Typography color={colors.grey[100]}>
                  
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.Status}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                R{transaction.Total}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
      
      
      </Box>
    </Box>
  );
};

export default Dashboard;
