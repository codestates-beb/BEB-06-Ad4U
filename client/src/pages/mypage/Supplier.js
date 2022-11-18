import React from 'react';
import './Supplier.css';

import Profile from './component/Profile';
import Status from './component/Status';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';

const SupplierMypage = () => {
  return (


    <Container className='supplierMypage_container'>
      <Row className='supplierMypage_row' >
        <Col xl={1}></Col>
        <Col xl={3} sm={5}  >
          <Profile />
        </Col>
        <Col xl={7} sm={7} >
        <Row>
          <h1> Supplier Mypage</h1>
          <Status />
        </Row>
        </Col>  
        <Col xl={1}></Col>        
      </Row>
    </Container>
  );
}

export default SupplierMypage;
