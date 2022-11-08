import React, {useState} from 'react'
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import swal from "sweetalert";
const View= () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
    const location = useLocation();
    const user = location.state
    console.log(user);
    const [Name, setName] = useState(location.state.row.Name);
    const [LastName, setLastName] = useState(location.state.row.LastName);
    const [Email, setEmail] = useState(location.state.row.Email)
    const [loading, setLoading] = useState(false);
  const handleFormSubmit = (values) => {
    console.log(values);
  };
function Update(){
  setLoading(true)
axios.put('https://admintimeclothengine.herokuapp.com/update',{Name:Name,LastName:LastName,id:location.state.row.idusers}).then((response)=>{
  setLoading(false)
  swal("Success","User updated successfully","success")
})

}
  return (
    <Box m="20px">
      <Header title="UPDATE USER" subtitle="Change New User Profile" />

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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={(e)=>setName(e.target.value)}
                value={Name}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={(e)=>setLastName(e.target.value)}
                value={LastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={(e)=>setEmail(e.target.value)}
                value={Email}
                disabled
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
         
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <LoadingButton  loading={loading} loadingPosition="end" type="submit" color="secondary" variant="contained" onClick={Update}>
                Update User
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

export default View;
