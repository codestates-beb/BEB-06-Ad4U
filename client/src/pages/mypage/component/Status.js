import React from 'react';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import './Status.css'

const Status = () => {
  return (
    <Container className='status_container'> 
      <div className="status-content_card-container">     
        <Row className='status_name'>
          <Col>전체</Col>
          <Col>요청중</Col>
          <Col>협의중</Col>
          <Col>진행중</Col>
          <Col>종료</Col>
          <Col>파기</Col>
        </Row>
        <Row className='status_count'>
          <Col>0</Col>
          <Col>1</Col>
          <Col>2</Col>
          <Col>3</Col>
          <Col>4</Col>
          <Col>5</Col>
        </Row>
      </div>
    </Container>
  );
}

export default Status;