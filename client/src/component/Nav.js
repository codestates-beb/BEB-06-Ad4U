import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './clear_logo.png';
import auth from '../hooks/axios/auth';
import { getLocalData, clearLocalData } from '../config/localStrage';

import { Navbar, NavDropdown, Container,Dropdown  } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import Avatar from 'react-avatar';
import { RiStarSmileLine } from "react-icons/ri";
import img from '../dummyfiles/img1.png';

import './NFE.css';

const Nav = ({ userData, setUserData }) => {

  const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 50) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll", () => {});
        };
    }, []);

  const isClient = getLocalData("isClient");

  const navigate = useNavigate();

  const deleteUserData = async () => {
    try {
      const result = await auth.logout();
      if (result) {
        setUserData({});
        clearLocalData();
        navigate('/');
      } 
    } catch (err) {
      alert(err.response.data);
    }
  }


  const LoggedIn = ({ userData }) => {
    return (
      <Stack direction="horizontal" gap={4} justify='flex-end'>
        <button className='navllgout_btn' onClick={deleteUserData}><span>logout</span></button>
        {/* window.scrollTo(0,0) 넣어야함 */}
        <Link to={`/mypage/${isClient === 'true' ? "client" : "supplier"}`} >
          {userData.profileImgUrl
            ? <Avatar src={userData.profileImgUrl} size="50" round={true}/> 
            : <Avatar src={img} size="50" round={true}/> }
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
    <Navbar expand="lg" className={`navbar ${show && 'nav_clear'}`}>
      <Container >
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
              <NavDropdown.Item href="/list">광고 목록</NavDropdown.Item>
              <NavDropdown.Item href="/list/client">기업 목록</NavDropdown.Item>
              <NavDropdown.Item href="/list/supplier">크리에이터 목록</NavDropdown.Item> 
            </Dropdown.Menu>
          </Dropdown>
        </Stack>
      </Container>
    </Navbar>
  )
}

export default Nav;