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
            Content
          </Row>
        </Col>          
      </Row>
    </Container>
  );
}

export default SupplierMypage;
