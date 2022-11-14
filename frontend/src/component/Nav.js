import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.png';
import './Nav.css';

import { Navbar, NavDropdown, FormControl, Form, Button, Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Avatar from 'react-avatar';
import Login from './Login';
import Signup from './Signup';

const Nav = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/">
          <img className="nav_logo" src = {Logo} alt = "Ad4U logo" width={100} height={70}/>
        </Link>
        <Stack direction="horizontal" gap={4} justifyContent='flex-end'>
          <Login />
          {/* <Button variant="light" className='Loginbtn'></Button>
          <Button variant="light" className='signupbtn'>Signup</Button> */}
          <Signup />
          <Avatar facebookId="100008343750912" size="50" round={true}/>
          <NavDropdown id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          </NavDropdown>
        </Stack>
      </Container>
    </Navbar>
    
  )
}

export default Nav;