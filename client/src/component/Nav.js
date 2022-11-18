import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './clear_logo.png';
import auth from '../hooks/axios/auth';

import { Button, Navbar, NavDropdown, Container } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Avatar from 'react-avatar';

import './Nav.css';

const Nav = ({ userData, setUserData }) => {

  const navigate = useNavigate();

  const deleteUserData = async () => {
    try {
      const result = await auth.logout();
      if (result) {
        setUserData({});
        alert("로그아웃 되었습니다.");
        navigate('/');
      } 
    } catch (err) {
      alert(err.response.data);
    }
  }

  const LoggedIn = ({ userData }) => {
    return (
      <Stack direction="horizontal" gap={4} justify='flex-end'>
        <button onClick={deleteUserData}>logout</button>
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
          LoginPage        
        </Button>
      </Stack>
    )
  }

  return (
    <Navbar expand="lg" className='navbar'>
      <Container>
        <Link to="/">
          <img className="nav_logo" src = {Logo} alt = "Ad4U logo" width={100} height={50}/>
        </Link>
        <Stack direction="horizontal" gap={4} justify='flex-end'>
            {userData.isClient 
              ? <LoggedIn userData={userData} />  
              : <Logout />
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