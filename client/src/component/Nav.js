import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';

import auth from '../hooks/axios/auth';
import { getLocalData, clearLocalData } from '../config/localStrage';
import Logo from './clear_logo.png';
import img from '../dummyfiles/img1.png';

import { NavDropdown, Dropdown, Row, Col, Stack } from 'react-bootstrap';
import { RiStarSmileLine } from "react-icons/ri";

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
        <button className='navllgout_btn' onClick={deleteUserData}><span>logout</span></button>
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
    <nav className={`navfix ${show && 'nav_clear'}`}>
      <Link to="/">
        <img className="nav_logo" src = {Logo} alt = "Ad4U logo" width={100} height={50}/>
      </Link>
      <div className='nav_login'>
        <Row>
          <Col>{isClient ? <LoggedIn userData={userData}/> : <Logout /> }</Col>
          <Col>
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
          </Col>
        </Row>
      </div>
    </nav>
  )
}

export default Nav;