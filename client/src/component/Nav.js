import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './clear_logo.png';

import { Col, Row, Button, Navbar, NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Avatar from 'react-avatar';
import smoothscroll from 'smoothscroll-polyfill';

import './Nav.css';

smoothscroll.polyfill();

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

  const onHomeClick = () => {
    window.scrollTo(0, 100, { behavior : "smooth" })
      };
  const onAboutClick = () => {
    window.scrollTo(0, 1000, { behavior : "smooth" })
      };
  const onAdClick = () => {
    window.scrollTo(0, 2000, { behavior : "smooth" })
      };
  const onCreatorClick = () => {
    window.scrollTo(0, 3000, { behavior : "smooth" })
      };

  return (
    <Navbar expand="lg" className='navbar'>
      <Container>
        <Link to="/">
          <img className="nav_logo" src = {Logo} alt = "Ad4U logo" width={100} height={50}/>
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
      <div className='menubar'>
      <Row className="justify-content-md-center" >
      <Col xs lg="2"><Button variant="link" onClick={onHomeClick}>Home</Button></Col>
      <Col xs lg="2"><Button variant="link" onClick={onAboutClick}>About</Button></Col>
      <Col xs lg="2"><Button variant="link" onClick={onAdClick}>Ad</Button></Col>
      <Col xs lg="2"><Button variant="link" onClick={onCreatorClick}>Creator</Button></Col>
      </Row>
      </div>
    </Navbar>
   
  )
}

export default Nav;