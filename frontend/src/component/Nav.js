import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.png';
import './Nav.css';

import { Navbar, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Avatar from 'react-avatar';
import Login from './Login';
import Signup from './SignUp';

const Nav = () => {
  const [isLogin, setIsLogin] = useState(true);

  const LoggedIn = () => {
    return (
      <Stack direction="horizontal" gap={4} justifyContent='flex-end'>
        <Link to='/mypage/client'>
          <Avatar size="50" round={true}/>
        </Link>
      </Stack>
    )
  }

  const Logout = () => {
    return (
      <Stack direction="horizontal" gap={4} justifyContent='flex-end'>
        <Login />
        <Signup />
      </Stack>
    )
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/">
          <img className="nav_logo" src = {Logo} alt = "Ad4U logo" width={100} height={70}/>
        </Link>
        <Stack direction="horizontal" gap={4} justifyContent='flex-end'>
          {isLogin ? <LoggedIn /> : <Logout />}
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