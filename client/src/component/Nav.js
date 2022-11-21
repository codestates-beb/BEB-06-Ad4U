import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './clear_logo.png';
import auth from '../hooks/axios/auth';
import { getLocalData, clearLocalData } from '../config/localStrage';

import { Navbar, NavDropdown, Container,Dropdown  } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Avatar from 'react-avatar';
import { RiStarSmileLine } from "react-icons/ri";

import './NFE.css';

const Nav = ({ userData, setUserData }) => {
  const isClient = getLocalData("isClient");

  const navigate = useNavigate();

  const deleteUserData = async () => {
    try {
      const result = await auth.logout();
      if (result) {
        setUserData({});
        clearLocalData();
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
        <Link to={`/mypage/${isClient === 'true' ? "client" : "supplier"}`}>
          <Avatar size="50" round={true}/>
        </Link>
      </Stack>
    )
  }

  const Logout = () => {
    return (
      <Stack direction="horizontal" gap={4}  justify='flex-end'>
          <Link to='./login'><button className='navlogin_btn'><span>Login</span></button></Link>
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
          {isClient ? <LoggedIn userData={userData}/> : <Logout /> }
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              < RiStarSmileLine color='white' size={30}/>
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark">
              <NavDropdown.Item href="/mypage/client">clientmypage</NavDropdown.Item>
              <NavDropdown.Item href="/mypage/supplier">suppliermypage</NavDropdown.Item>
              <NavDropdown.Item href="/list">list</NavDropdown.Item> 
            </Dropdown.Menu>
          </Dropdown>
        </Stack>
      </Container>
    </Navbar>
  )
}

export default Nav;