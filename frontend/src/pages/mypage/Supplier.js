import React from 'react';

import Profile from './component/Profile';
import Status from './component/Status';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';

const SupplierMypage = () => {
  return (
    <Container>
      <Row xs={2}>
        <Col xs={2}>
          <Profile />
        </Col>
        <Col xs={10}>
        <Row>
          <div> Supplier Mypage</div>
          <Status />
        </Row>
        <Row>
          <Navbar expand="mg">
            <Col xs={2}>
              <Navbar.Brand>지원회사</Navbar.Brand>  
            </Col>  
            <Col xs={5}>
              <Navbar.Brand>title</Navbar.Brand>   
            </Col>
            <Col xs={2}>
              <Navbar.Brand>진행상태</Navbar.Brand>
            </Col>
            <Col xs={1}>
              <Navbar.Brand>tokenId</Navbar.Brand>
            </Col>
            <Col xs={1}>
              <Navbar.Brand>Mint</Navbar.Brand>
            </Col>
            <Col xs={1}>
              <Navbar.Toggle />
            </Col>
            <Navbar.Collapse id="navbar-dark-example">
              <Nav>     
                {/* dropdown */}         
                <NavDropdown.Item href="#action/3.1">
                  지원자 1                  
                  <Button>Wallet</Button>    
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  지원자 2   
                  <Button>Wallet</Button>  
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  지원자 3
                  <Button>Wallet</Button>  
                </NavDropdown.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
        </Col>          
      </Row>
    </Container>
);
}

export default SupplierMypage;
