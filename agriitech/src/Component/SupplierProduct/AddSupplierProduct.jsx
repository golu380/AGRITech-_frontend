import React ,{useState,useEffect}from 'react';
import axios from 'axios';
// import {Form,Button, Row,Col,Container} from 'react-bootstrap';

import Loader from '../Loader/Loader';
// import { makeStyles } from '@mui/material';
import {Grid,
Paper,
TextField,
Button,
Container,
Select,
MenuItem,
InputLabel,
Input,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSupplierProduct } from '../../actions/supplierProduct';

const AddSupplierProduct = ()=>{
const [name, setName] = useState('');
const [email,setEmail] = useState('');
const [image,setImage] = useState('');
const [address,setAddress] = useState('');
const [imgUrl, setImgeUrl] = useState('');
const [cropSelection,setCropSelection] = useState('');
const [storage,setStorage] = useState('');
const [phonenumber,setPhonenumber] = useState('');
const  [description,setDescription] = useState('');
const [uploading, setUploading] = useState('');
const [imageView, setImageView] = useState('');
const [id,setId] = useState('');

const navigate = useNavigate('');

const dispatch = useDispatch();
const productCreate = useSelector(state=> state.productCreate);
const {loading, success, error} = productCreate

const userLogin = useSelector(state=>state.userLogin)
const {userInfo} = userLogin;

useEffect(() =>{
  if(!userInfo){
    navigate('/login');
  }
},[userInfo,navigate,dispatch]);

console.log(userInfo);
const containerStyle = {
    marginTop : '20px',
}
const paperStyle={
    padding: '20px',
}
// const [selectedOption, setSelectedOption] = useState('');
const SubmitHandler = (e) =>{
  e.preventDefault();
  console.log(image)
  console.log(id);
  dispatch(createSupplierProduct({
    name,
    email,
    address,
    cropSelection,
    storage,
    image,
    imgUrl,
    phonenumber,
    description,
    id
  }))
  setName('')
  setEmail('')
  setImage('')
  setAddress('')
  setCropSelection('')
  setPhonenumber('')
  setStorage('')
  setImgeUrl('')
}
  const handleOptionChange = (event) => {
    setCropSelection(event.target.value);
  };
  const uploadFileHandler = async (e) => {
    e.preventDefault();
    setId(userInfo.data.user._id)
    const file = e.target.files[0]
    console.log(file);
    console.log(e.target.value);
    setImageView(e.target.value);
    const formData = new FormData();
    formData.append('image',file)
    setUploading(true);
    try{
      const config = {
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      }
      const {data} = await axios.post('http://localhost:8080/api/upload',formData,config);
      console.log(data);

      setImage(data);
      
      setUploading(false);

    }catch(error){
      console.log(error)
      setUploading(false);
    }
  }

    return (
        <Container style={containerStyle} maxWidth="md">
      <Paper style={paperStyle} elevation={3}>
        <form  onSubmit={SubmitHandler}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                required
                value = {name}
                variant="outlined"
                onChange={(e)=>setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                
              />
            </Grid>
            <Grid item xs={12} sm = {6}>
              <TextField
                label="Your Adress"
                fullWidth
                variant="outlined"
                required
                value = {address}
                onChange = {(e)=>setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              
              <Select
                label="select you crop" 
                value={cropSelection}
                onChange={handleOptionChange}
                fullWidth
                variant="outlined"
                required
                
          
                
              >
                <MenuItem value="">Select Your Crop</MenuItem>
                <MenuItem value="option1">Paddy</MenuItem>
                <MenuItem value="option2">Wheat</MenuItem>
                <MenuItem value="option3">Sugarcan</MenuItem>
              </Select>
            </Grid>
            <Grid item xs ={12} sm ={6}>
                <TextField
                label="Image URL"
                // value ={}
                value ={imgUrl}
                onChange={(e)=>setImgeUrl(e.target.value)}
                
                fullWidth
                variant="outlined" />
            </Grid>
            <Grid item xs = {12} sm = {6}>
            <InputLabel htmlFor="image-upload">Select Image:</InputLabel>
              <Input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={uploadFileHandler}
                fullWidth
                required
                value={imageView}
            
              />
              {uploading && <Loader />}
            </Grid>
            <Grid item xs ={12} sm ={6}>
                <TextField 
                label="Phone Number"
                variant="outlined"
                fullWidth
                required
                value = {phonenumber}
                onChange={(e)=>setPhonenumber(e.target.value)}
              
                />
            </Grid>
            <Grid item xs ={12} sm ={6}>
                <TextField
                label="Product Size"
                // value ={}
                fullWidth
                variant="outlined"
                required
                value={storage}
                onChange={(e)=>setStorage(e.target.value)}

                 />
                
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description of the product "
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                required
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
    )
}

export default AddSupplierProduct;