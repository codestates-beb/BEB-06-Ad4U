import React from 'react';
import './Client.css';

import Profile from './component/Profile';
import Status from './component/Status';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';

const ClientMypage = () => {
  return (
    <Container className='supplierMypage_container'>
      {/* <Row xs={2}>
        <Col xs={2}>
          <Profile />
        </Col>
        <Col xs={10}>
        <Row>
          <div> Client Mypage</div>
          <Status />
        </Row>
        <Row>
          Content
        </Row>
        </Col>          
      </Row> */}
      <Row>
        <Col><Profile /></Col>
        <Col>
        <Row><Status /></Row>
        </Col>
      </Row>

    </Container>
  );
}

export default ClientMypage;


