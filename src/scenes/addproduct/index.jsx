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
import LoadingButton from '@mui/lab/LoadingButton';
import swal from "sweetalert";
import { useUIContext } from "../../context/ui";
const AddProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [Shop, setShop] = useState('');
  
  const [ProductType, setProductType] = useState('');
 
  const [ProductTypeCategory, setProductTypeCategory] = useState('');
  
  const [ProductLabel, setLabel] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const { CurrentUserEmail,
    LoggedID } = useUIContext();
   
   

  const handleFormSubmit = (values) => {
    console.log(LoggedID)
    setLoading(true)
      console.log("Clicked")
    if (imageUpload == null) {
      swal("Error","Select Product image","error")
      setLoading(false)
      return false
    };
   
    const imageRef = ref(storage, `Products/${imageUpload.name }`);
    
    uploadBytes(imageRef, imageUpload).then((snapshot1) => {
      getDownloadURL(snapshot1.ref).then( async (url1) =>  {
      
        try {
          Axios.post('https://admintimeclothengine.herokuapp.com/addproduct',{
            ShopName: Shop,
            ProductName: values.ProductName,
            ProductType:ProductType,
            ProductTypeCategory:ProductTypeCategory,
            ProductDiscription:values.ProductDiscription,
            ProductPrice:values.ProductPrice,
            ProductLabel:ProductLabel,
            ProductPhoto:url1,
            idshop:6,
            idadmin:LoggedID
          }).then((response)=>{
            console.log("Success")
            setLoading(false)
            swal("Success","Product added successfully","success")
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
  };

  
  return (
    <Box m="20px">
      <Header title="ADD PRODUCTS" subtitle="Add to any Shop Available" />

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
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Product Image</InputLabel>
                        <input
                          type="file"
                          onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                          }}
                        />
              </FormControl>
            
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ProductName}
                name="ProductName"
                error={!!touched.ProductName && !!errors.ProductName}
                helperText={touched.ProductName&& errors.ProductName}
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Product Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ProductPrice}
                name="ProductPrice"
                error={!!touched.ProductPrice && !!errors.ProductPrice}
                helperText={touched.ProductPrice && errors.ProductPrice}
                sx={{ gridColumn: "span 2" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Product Discription"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ProductDiscription}
                name="ProductDiscription"
                rows={2}
                error={!!touched.ProductDiscription && !!errors.ProductDiscription}
                helperText={touched.ProductDiscription && errors.ProductDiscription}
                sx={{ gridColumn: "span 2" }}
              />
             
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <LoadingButton  loading={loading} loadingPosition="end" type="submit" color="secondary" variant="contained">
                Add Product </LoadingButton>
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
  
  ProductPrice: yup.string().required("required"),
  ProductDiscription:yup.string().required("required"),
  ProductPrice:yup.string().required("required"),
  
});
const initialValues = {

  ProductPrice: "",
  ProductDiscription:"",
  ProductPrice:""
};

export default AddProduct;
