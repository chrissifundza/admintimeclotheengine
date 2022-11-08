import React from 'react';
import Axios from 'axios';
import { useState } from "react";
import { Box, Button, MenuItem, TextField, FormControl, InputLabel,Select } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import LoadingButton from '@mui/lab/LoadingButton';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
import { storage } from "../../firebase";
import { db } from '../../firebase';
import { useUIContext } from "../../context/ui";
import swal from "sweetalert";
const Shop = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [Shop, setShop] = useState('');
  const [Brand, setBrand] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [ShopIcon, setShopIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const {CurrentUserEmail,LoggedID } = useUIContext();
  
  const handleFormSubmit = (values) => {
    setLoading(true)
      console.log("Clicked")
    if (imageUpload == null) {
      swal("Error","Select Cover image","error")
      setLoading(false)
      return false
    };
    if (ShopIcon == null)
    {
      swal("Error","Select Icon image","error")
      return false
    };
    const imageRef = ref(storage, `images/${imageUpload.name }`);
    const iconRef = ref(storage, `images/${ShopIcon.name }`)
    uploadBytes(imageRef, imageUpload).then((snapshot1) => {
      getDownloadURL(snapshot1.ref).then( async (url1) =>  {
    uploadBytes(iconRef, ShopIcon).then((snapshot2) => {
      getDownloadURL(snapshot2.ref).then( async (url2) =>  {    
        try {
          Axios.post('https://admintimeclothengine.herokuapp.com/createshop',{
            ShopName: Shop,
            Address: values.Address,
            ShortAddress:values.ShortAddress,
            ShortDiscription:values.Discription,
            CoverPhoto:url1,
            Icon:url2,
            Brand:Brand,
            idadmin:LoggedID
          }).then((response)=>{
            console.log("Success")
            setLoading(false)
            swal("Success","Shop added successfully","success")
          })
        /*  const docRef = await addDoc(collection(db, "Shops"), {
            ShopName: Shop,
            Address: values.Address,
            ShortAddress:values.ShortAddress,
            ShortDiscription:values.Discription,
            CoverPhoto:url1,
            Icon:url2
          });
          alert("Document written with ID: ", docRef.id);*/
        } catch (error) {
          alert(error)
        }
       
        
      });
    });
  });
});
  };

  
  return (
    <Box m="20px">
      <Header title="ADD SHOP" subtitle="ADD SHOP TO TES DELIVERY" />

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
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Shop Name</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={Shop}
                    onChange={(event)=>{setShop(event.target.value)}}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="Mr Price">Mr Price</MenuItem>
                    <MenuItem value="Exact">Exact</MenuItem>
                    <MenuItem value="Trueworths">Trueworths</MenuItem>
                    <MenuItem value="Legit">Legit</MenuItem>
                    <MenuItem value="Edgars">Edgars</MenuItem>  
                    <MenuItem value="Markham">Markham</MenuItem>
                    <MenuItem value="Identity">Idenity</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Brand Name</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={Brand}
                    onChange={(event)=>{setBrand(event.target.value)}}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="Uzzi, DH, Hemisphere">Uzzi, DH, Hemispher</MenuItem>
                    <MenuItem value="Nike, Adidas, Puma">Nike, Adidas, Puma</MenuItem>
                    <MenuItem value="Legit">Legit</MenuItem>
                    <MenuItem value="Guess">Guess</MenuItem>
                    <MenuItem value="Relay">Relay</MenuItem>
                    <MenuItem value="Chino, Denim">Chino, Denim, Network</MenuItem>
                    <MenuItem value="No Brand">No Brand</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Shop Cover</InputLabel>
                        <input
                          type="file"
                          onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                          }}
                        />
              </FormControl>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Shop Icon</InputLabel>
                        <input
                          type="file"
                          onChange={(event) => {
                            setShopIcon(event.target.files[0]);
                          }}
                        />
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Address}
                name="Address"
                error={!!touched.Address && !!errors.Address}
                helperText={touched.Address && errors.Address}
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Short Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ShortAddress}
                name="ShortAddress"
                error={!!touched.ShortAddress && !!errors.ShortAddress}
                helperText={touched.ShortAddress && errors.ShortAddress}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Short discription"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Discription}
                name="Discription"
                rows={2}
                error={!!touched.Discription && !!errors.Discription}
                helperText={touched.Discription && errors.Discription}
                sx={{ gridColumn: "span 2" }}
              />
             
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <LoadingButton  loading={loading} loadingPosition="end" type="submit" color="secondary" variant="contained">
                Add Shop </LoadingButton  >
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
  
  Address: yup.string().required("required"),
  Discription:yup.string().required("required"),
  ShortAddress:yup.string().required("required"),
  
});
const initialValues = {

  Address: "",
  Discription:"",
  ShortAddress:""
};

export default Shop;
