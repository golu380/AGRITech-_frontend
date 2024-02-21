import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import {Link as RouterLink, useHistory,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../../actions/userActions'
import Loader from '../Loader/Loader';
import backgroundimg from "../../assets/authback.jpg";

const loginStyles = {
  container: {
    height: '100vh',
    
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

const LoginComponent1 = () => {
  const navigate = useNavigate('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();


  const userLogin = useSelector(state => state.userLogin)
  const {loading, userInfo, error} = userLogin;
  console.log(userLogin);
  
  

  const handleLogin = (e) => {
    // Handle login logic here
    e.preventDefault();
 
    dispatch(login(email,password))
    if(userInfo){
      navigate('/');
    }
   

  
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={loginStyles.container}>
      <Paper style={loginStyles.formContainer} elevation={3}>{
        error && <Typography variant = "h5" align="center">{error}</Typography>

      }
      {loading && <Loader />}
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <form style={loginStyles.form}>
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
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
          <Typography >New User ? </Typography>
          <RouterLink fullWidth  variant="contained" color="primary"to="/register">Register</RouterLink>
        </form>
      </Paper>
    </Grid>
  );
};

export default LoginComponent1;
