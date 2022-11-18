import React from 'react';
import './Client.css';

import Profile from './component/Profile';
import Status from './component/Status';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';

const ClientMypage = () => {
  return (
    <div className='supplierMupage_container'>
    <Container>
      <Row xs={2}>
        <Col xs={2}>
          <Profile />
        </Col>
        <Col xs={10}>
        <Row>
          <div> Client Mypage</div>
          <Status />
        </Row>
        <Row>
          <Navbar expand="mg">
            <Col xs={10}>
              <Navbar.Brand>광고1</Navbar.Brand>
            </Col>  
            <Col xs={1}>
              <Button>Wallet</Button>
            </Col>
            <Col xs={1}>
              <Navbar.Toggle />
            </Col>
            <Navbar.Collapse id="navbar-dark-example">
              <Nav>
                {/* dropdown */}
                <NavDropdown.Item href="#action/3.1">
                  지원자 1                      
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  지원자 2   
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  지원자 3
                </NavDropdown.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
        </Col>          
      </Row>
    </Container>
    </div>
  );
}

export default ClientMypage;


