import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.png';

import { Button, Navbar, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Avatar from 'react-avatar';

import './Nav.css';

const Nav = ({ userData }) => {

  const LoggedIn = ({ userData }) => {
    return (
      <Stack direction="horizontal" gap={4} justify='flex-end'>
        <Link to='/mypage/client'>
          <Avatar size="50" round={true}/>
        </Link>
      </Stack>
    )
  }

  const Logout = () => {
    return (
      <Stack direction="horizontal" gap={4}  justify='flex-end'>
        <Button href='./login'>
          Login        
        </Button>
      </Stack>
    )
  }

  return (
    <Navbar bg="light" expand="lg" className='navbar'>
      <Container>
        <Link to="/">
          <img className="nav_logo" src = {Logo} alt = "Ad4U logo" width={100} height={70}/>
        </Link>
        <Stack direction="horizontal" gap={4} justify='flex-end'>
            {userData.length === 0 
              ? <Logout />
              : <LoggedIn userData={userData}/> 
            }
          <NavDropdown id="basic-nav-dropdown">
          <NavDropdown.Item href="/mypage/client">clientmypage</NavDropdown.Item>
          <NavDropdown.Item href="/mypage/supplier">suppliermypage</NavDropdown.Item>
          <NavDropdown.Item href="/list">list</NavDropdown.Item> 
          </NavDropdown>
        </Stack>
      </Container>
    </Navbar>
  )
}

export default Nav;