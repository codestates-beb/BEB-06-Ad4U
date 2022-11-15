import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { decodeToken }from 'react-jwt';
import env from "react-dotenv";
import Login from './Login';
import Signup from './Signup';
import Logo from './Logo.png';

import { Navbar, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Avatar from 'react-avatar';

import './Nav.css';

const Nav = ({ userData }) => {
  const [email, setEmail] = useState("");

  /* Google Oath */
  const onSuccess = async(res) => {
    const token = decodeToken(res.credential);
    console.log(token);
    setEmail(token.email);
  }

  const onError = (error) => {
    alert(error);
  }

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
        <Login onSuccess={onSuccess} onError={onError} email={email}/>
        <Signup onSuccess={onSuccess} onError={onError} email={email}/>
      </Stack>
    )
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/">
          <img className="nav_logo" src = {Logo} alt = "Ad4U logo" width={100} height={70}/>
        </Link>
        <Stack direction="horizontal" gap={4} justify='flex-end'>
          <GoogleOAuthProvider clientId={env.OATH_CLIENTID}>
            {userData 
              ? <Logout />
              : <LoggedIn userData={userData}/> 
            }
          </GoogleOAuthProvider>
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