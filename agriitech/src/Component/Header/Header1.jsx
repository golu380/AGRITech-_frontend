import {React,useState} from 'react';
import { Box,AppBar,Tooltip, Avatar,Popover, Toolbar, ListItemIcon, Typography, IconButton, Button, Badge,Drawer, List, ListItem, ListItemText, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'react-bootstrap/Image';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Router, Link,useNavigate,useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Divider from '@mui/material/Divider';
import LoginComponent1 from '../Login/LoginComponent1';
import '../../popup.css';


import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
// import LoginComponent1 from '../Login/LoginComponent1';
import {logout} from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
const Header = () => {
    // const userInfo= {
    //     name:"Amit Kumar Dubey",
    //     isAdmin : true
    // }
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const userLogin = useSelector(state => state.userLogin)
  console.log(userLogin);
 const {userInfo} = userLogin;
 console.log(userInfo);


 

    
    const handleFarmer = (e) =>{
      e.preventDefault();
      navigate('/farmer');
    }
    const [isOpen, setIsOpen] = useState(false)
    const togglePopup = () => {
      setIsOpen(!isOpen)
    }

    const logoutHandler =()=>{
      console.log("logged out")
      dispatch(logout());
    }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          {/* Menu icon for small screens */}
          <IconButton color="inherit" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>

          {/* Brand/logo */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Image width="80px" src="/Logo.png" />
          </Typography>

          {/* Navigation links (adjust as needed) */}
          <Button component={Link} to="/"color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>Home</Button>
          <Button component = {Link} to="/farmer" color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>FARMER</Button>
          <Button  color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>CONSUMER</Button>
          <Button component={Link} to='/supplier' color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>SUPPLIER</Button>
          <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>Cart</Button>
          <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>
            <Badge badgeContent={3} color="error">
              <ShoppingCartIcon />
            </Badge>
          </Button>
          {
            userInfo ? (
                
                    /* <NavDropdown title={userInfo.name.toUpperCase()} id="collapsible-nav-dropdown"> */
                    <>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                   
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <Avatar sx={{ width: 32, height: 32 }}>{userInfo.data.user.name[0].toUpperCase()}</Avatar>
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&::before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                     {
                    userInfo && userInfo.data.user.isAdmin && (
                      <>
                         <MenuItem component={Link} to="#/admin/dashboard">DASHBOARD</MenuItem>
                        <MenuItem component={Link} to="/admin/userlist">USERS</MenuItem>
                        <MenuItem component={Link} to="/admin/productlist">PRODUCTS</MenuItem>
                        <MenuItem component={Link} to="/admin/orderlist">ORDERS</MenuItem>
                      </>
                     
                    )
                }
                    <MenuItem onClick={handleClose}>
                      <Avatar /> {userInfo.data.user.name.toUpperCase()}
                    </MenuItem>
                   <Divider />
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon onClick={logoutHandler} >
                        <Logout fontSize="small"  />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                  </>
            ):(
              <div>
                <Button  component={Link} to="/login" className='login-btn' color="inherit" sx={{ display: { xs: 'none', md: 'block' } }} underline="none" >SIGN IN</Button>
               
              </div>
                
            )
            }

            
               
            
          {/* <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }}>Login</Button> */}
        </Toolbar>
      </Container>

      {/* Responsive Drawer for small screens */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
      >
        <List>
          <ListItem Button onClick={handleDrawerClose}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem Button onClick={handleDrawerClose}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem Button onClick={handleDrawerClose}>
            <ListItemText primary="Services" />
          </ListItem>
          <ListItem Button onClick={handleDrawerClose}>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
