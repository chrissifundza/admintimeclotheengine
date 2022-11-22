import React from 'react';
import Axios from 'axios';
import { useState } from "react";
import { Box, Button, MenuItem, TextField, FormControl, InputLabel,Select } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
import { storage } from "../../firebase";
import { db } from '../../firebase';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import swal from "sweetalert";
const ViewProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const location = useLocation();
  const product = location.state.row
  console.log(product);
  const [Shop, setShop] = useState(product.ShopName);
  
  const [ProductType, setProductType] = useState(product.ProductType);
 
  const [ProductTypeCategory, setProductTypeCategory] = useState(product.ProductTypeCategory);
  const [loading, setLoading] = useState(false);
  const [ProductLabel, setLabel] = useState(product.ProductLabel);
  const [imageUpload, setImageUpload] = useState(product.ProductPhoto);
  const [ProductName, setProductName] = useState(product.ProductName);
  const [ProductPrice, setProductPrice] = useState(product.ProductPrice);
  const [ProductDiscription, setProductDiscription] = useState(product.ProductDiscription)

  function Update(){
    setLoading(true)
    axios.put('https://admintimeclothengine.herokuapp.com/productupdate',{ShopName: Shop,
    ProductName: ProductName,
    ProductType:ProductType,
    ProductTypeCategory:ProductTypeCategory,
    ProductDiscription:ProductDiscription,
    ProductPrice:ProductPrice,
    ProductLabel:ProductLabel,
    ProductPhoto:imageUpload,
    id:product.idshopsproducts}).then((response)=>{
      setLoading(false)
      swal("Success","Product updated successfully","success")
    })
}
  const handleFormSubmit = (values) => {
    
      console.log("Clicked") /*
      
       "@nivo/bar": "^0.80.0",
    "@nivo/core": "^0.79.0",
    "@nivo/geo": "^0.80.0",
    "@nivo/line": "^0.79.1",
    "@nivo/pie": "^0.80.0",
      */ 
   
  };

  
  return (
    <Box m="20px">
      <Header title="UPDATE PRODUCT" subtitle="Update to any Shop Available" />

      <Formik
        onSubmit={handleFormSubmit} 
        initialValues={initialValues}
       
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
                    </Select>
                </FormControl>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Label</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={ProductLabel}
                    onChange={(event)=>{setLabel(event.target.value)}}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="Uzzi">Uzzi</MenuItem>
                    <MenuItem value="Nike">Nike</MenuItem>
                    <MenuItem value="DH">DH</MenuItem>
                    <MenuItem value="Hemisphere">Hemisphere</MenuItem>
                    <MenuItem value="Adidas">Adidas</MenuItem>
                    <MenuItem value="Legit">Legit</MenuItem>
                    <MenuItem value="Guess">Guess</MenuItem>
                    <MenuItem value="Relay">Relay</MenuItem>
                    <MenuItem value="Chino">Chino</MenuItem>
                    <MenuItem value="Denim">Denim</MenuItem>
                    <MenuItem value="No Brand">No Brand</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={ProductType}
                    onChange={(event)=>{setProductType(event.target.value)}}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="T-shirt">T-shirt</MenuItem>
                    <MenuItem value="Trouser">Trouser</MenuItem>
                    <MenuItem value="Jackat">Jackat</MenuItem>
                    <MenuItem value="Bag">Bag</MenuItem>
                    <MenuItem value="Dress">Dress</MenuItem>
                    <MenuItem value="Shoes">Shoes</MenuItem>
                    <MenuItem value="Accessories">Accessories</MenuItem>
                    <MenuItem value="Shirt">Shirt</MenuItem>
                    <MenuItem value="Half-arm">Half-arm</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Fabric Type Category</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={ProductTypeCategory}
                    onChange={(event)=>{setProductTypeCategory(event.target.value)}}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="Cotton">Cotton</MenuItem>
                    <MenuItem value="Leather">Leather</MenuItem>
                    <MenuItem value="Wool">Wool</MenuItem>
                    </Select>
                </FormControl>
                
            
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Name"
                onBlur={handleBlur}
                onChange={(e)=>setProductName(e.target.value)}
                value={ProductName}
                name="ProductName"
               
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Product Price"
                onBlur={handleBlur}
                onChange={(e)=>setProductPrice(e.target.value)}
                value={ProductPrice}
                name="ProductPrice"
               
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Discription"
                onBlur={handleBlur}
                onChange={(e)=>setProductDiscription(e.target.value)}
                value={ProductDiscription}
                
                name="ProductDiscription"
                rows={2}
               
                sx={{ gridColumn: "span 2" }}
              />
             
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <LoadingButton  loading={loading} loadingPosition="end" type="submit" color="secondary" variant="contained" onClick={Update}>
                Update Product </LoadingButton >
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
  

  
});
const initialValues = {

  ProductPrice: "",
  ProductDiscription:"",
  ProductPrice:""
};

export default ViewProduct;
