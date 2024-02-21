import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Paper,TextField, Button, Typography } from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions';
import Message from '../Message/Message';
import Loader from '../Loader/Loader';
import backgroundimg from "../../assets/authback.jpg";



const loginStyles = {
  container: {
    height: '80vh',
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `url(${backgroundimg})`
  },
  formContainer: {
    maxWidth: 500,
    width:400,
    padding: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile,setMobile] = useState('');
  const [message,setMessage] = useState('');

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const {loading, userInfo, error} = userRegister
  // const redirect = location.search? location.search.split('=')[1]:'/'
  // useEffect(() =>{
  //   if(userInfo){
  //     history.push(redirect)
  //   }
  // },[userInfo,history,redirect])

  

  const handleRegister = (e) => {
    // Handle registration logic here
   e.preventDefault()
   if(password !== confirmPassword){
    setMessage("passwords are not matched!")
   }else{
    dispatch(register(name,email,password,mobile));
    console.log(userInfo,loading,error.message)
   }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={loginStyles.container}>
      <Paper style={loginStyles.formContainer} elevation={3}>{
        loading && <Loader />
      }
      {
        error && <Typography variant="danger" align="center" gutterBottom>
        {error}
      </Typography>
      }
      {
        message && <Typography variant="h5" align="center" gutterBottom>
        {message}
      </Typography>
      }
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form style={loginStyles.form}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Mobile number"
            variant="outlined"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button fullWidth variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
          {/* <Typography >New User ? </Typography>
          <RouterLink fullWidth  variant="contained" color="primary"to="/register">Register</RouterLink> */}
        </form>
      </Paper>
    </Grid>
  );
};

export default Register;
