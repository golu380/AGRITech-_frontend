import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import {Link }from 'react-router-dom';
import '../Header/Header.css'

const Header = () => {
    const userInfo= {
        name:"Amit Kumar Dubey",
        isAdmin : false
    }
    // const userInfo = null
    const logoutHandler = () =>{
        alert("You have been logged out!");
    }
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container >
        <Navbar.Brand to="/" className="nav-cal">
            <Image width="80px" src="/Logo.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/layout1" className="nav-cal" >HOME</Nav.Link>
            <Nav.Link as={Link} to="#farmer" className="nav-cal">FARMER</Nav.Link>
            <Nav.Link as={Link} to="#consumer" className="nav-cal">CONSUMER</Nav.Link>
            <Nav.Link as={Link} to="#login?redirect=supplier" className="nav-cal">SUPPLIER</Nav.Link>
            <Nav.Link as={Link} to="#/cart" className={`${userInfo ? "remove-space" : "add-space cart nav-cal"} `}>
            <i className="fas fa-shopping-cart"></i>
            CART
            </Nav.Link>
            {
            userInfo ? (
                
                    /* <NavDropdown title={userInfo.name.toUpperCase()} id="collapsible-nav-dropdown"> */
                <NavDropdown title = {userInfo.name.toUpperCase()} id="username">
                    {
                    userInfo && userInfo.isAdmin && (
                        <NavDropdown.Item as={Link} to="#/admin/dashboard">DASHBOARD</NavDropdown.Item>
                    )
                }
              <NavDropdown.Item as={Link} to="#/profile">PROFILE</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#/login" onClick={logoutHandler}>
               LOGOUT
              </NavDropdown.Item>
              
            </NavDropdown>
            ):(
                <Nav.Link as={Link} to="/login" className="login nav-cal">SIGN IN</Nav.Link>
            )
            }
            {
            userInfo && userInfo.isAdmin && (
                <NavDropdown title="ADMIN" id="adminmenu">
                <NavDropdown.Item as={Link} to="#admin/userlist">
                    USER
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#action/3.1">
                    PRODUCTS
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#action/3.1">
                    ORDERS
                </NavDropdown.Item>
                </NavDropdown>
            )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;