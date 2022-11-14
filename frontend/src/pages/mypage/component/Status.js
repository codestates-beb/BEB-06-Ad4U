import React from 'react';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import './Status.css'

const Status = () => {
  return (
      <Container className='status_container'>        
        <Row className='status_name'>
          <Col xs={2}>전체</Col>
          <Col xs={2}>요청중</Col>
          <Col xs={2}>협의중</Col>
          <Col xs={2}>진행중</Col>
          <Col xs={2}>종료</Col>
          <Col xs={2}>파기</Col>
        </Row>
        <Row className='status_count'>
          <Col xs={2}>0</Col>
          <Col xs={2}>1</Col>
          <Col xs={2}>2</Col>
          <Col xs={2}>3</Col>
          <Col xs={2}>4</Col>
          <Col xs={2}>5</Col>
        </Row>
      </Container>
  );
}

export default Status;