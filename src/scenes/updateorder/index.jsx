import React, {useState, useEffect} from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import swal from "sweetalert";
const UpdateOrder =() => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const user = location.state
    console.log(user);
    const [Status, setStatus] = useState(location.state.row.Status);
    const [Drivers, setDrivers] = useState([])
    const [AssignedDriver, setAssignedDriver] = useState('')
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  useEffect(()=>{
    axios.get("https://admintimeclothengine.herokuapp.com/driver").then((res)=>{
     console.log(res.data) 
     setDrivers(res.data)
     
    })
  },[]) 
  let SelectD = Drivers.filter((driver)=>driver.DriverName==AssignedDriver)
 
function Update(){
  console.log(SelectD);

  setLoading(true)
axios.put('https://admintimeclothengine.herokuapp.com/orderupdate',{Status:Status,DriverName:SelectD[0].DriverName,DriverCell:SelectD[0].Cellphone,id:location.state.row.idorders}).then((response)=>{
  setLoading(false)  
//swal("Success","Order updated successfully","success")
OrderDetailUpdate()
})

}
function OrderDetailUpdate(){
  axios.put('https://admintimeclothengine.herokuapp.com/orderdetailupdate',{idorders:user.row.idorders,iddriver:SelectD[0].iddriver}).then((response)=>{
  setLoading(false)  
swal("Success","Order updated successfully","success")
})
  return (
    <Box m="20px">
      <Header title="UPDATE ORDER" subtitle="Change Status Order" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
                <Paper   sx={{p:2}}>
                <Typography sx={{mb:2}} variant="h4">{location.state.row.Products}</Typography>
                <Typography>R{location.state.row.Total}</Typography>
                </Paper>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Status update</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={Status}
                    onChange={(event)=>{setStatus(event.target.value)}}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="Ordered">Ordered</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    
                    </Select>
                </FormControl>

                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Assign Driver</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={AssignedDriver}
                    onChange={(event)=>{setAssignedDriver(event.target.value)}}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {Drivers.map((driver)=>{

                      return(
                        <MenuItem key={driver.iddriver} value={driver.DriverName}>{driver.DriverName}</MenuItem>

                      )
                    })}
                    
                   
                    
                    </Select>
                </FormControl>
         
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <LoadingButton  loading={loading} loadingPosition="end" type="submit" color="secondary" variant="contained" onClick={Update}>
                Update Order
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
 
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  
};

export default UpdateOrder;
