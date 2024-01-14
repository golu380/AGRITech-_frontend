import React ,{useState,useEffect}from 'react';

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
Input} from '@mui/material';

const AddSupplierProduct = ()=>{
const [name, setName] = useState('');
const [email,setEmail] = useState('');
const [image,setImage] = useState('');
const [address,setAddress] = useState('');
const [cropSelection,setCropSelection] = useState('');
const [storage,setStorage] = useState('');
const [phonenumber,setPhonenumber] = useState('');
const  [description,setDescription] = useState('');
const [uploading, setUploading] = useState('');

const containerStyle = {
    marginTop : '20px',
}
const paperStyle={
    padding: '20px',
}
const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleImageChange = (e) => {
    e.preventDefault();
  }

    return (
        <Container style={containerStyle} maxWidth="md">
      <Paper style={paperStyle} elevation={3}>
        <form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm = {6}>
              <TextField
                label="Your Adress"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              
              <Select
                label="select you crop" 
                value={selectedOption}
                onChange={handleOptionChange}
                fullWidth
                variant="outlined"
                
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
                required
                fullWidth
                variant="outlined" />
            </Grid>
            <Grid item xs = {12} sm = {6}>
            <InputLabel htmlFor="image-upload">Select Image:</InputLabel>
              <Input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                fullWidth
              />
              {uploading && <Loader />}
            </Grid>
            <Grid item xs ={12} sm ={6}>
                <TextField 
                label="Phone Number"
                variant="outlined"
                fullWidth
                />
            </Grid>
            <Grid item xs ={12} sm ={6}>
                <TextField
                label="Product Size"
                // value ={}
                fullWidth
                variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description of the product "
                multiline
                rows={4}
                fullWidth
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button variant="contained" color="primary">
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