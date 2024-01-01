import React, { useState } from 'react';
import { Container, Box, Grid, Paper,TextField, Button, Typography } from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';

const loginStyles = {
  container: {
    height: '100vh',
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `url("https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=682&q=80")`
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

  

  const handleRegister = () => {
    // Handle registration logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={loginStyles.container}>
      <Paper style={loginStyles.formContainer} elevation={3}>
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
