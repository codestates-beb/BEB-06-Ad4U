import React from 'react';
import { Accordion, Col, Row, Container } from 'react-bootstrap';

import './Status.css'

const Status = ({ adList, setStatus }) => {
  const count = (arr, status) => {
    let result = 0;
    arr.forEach(el => {
      if(el.status === status) {
        result++;
      }
    });
    return result;
  }

  return (
    <Container className='status_container'> 
      <div className="status-content_card-container">     
        <Row className='status_name'>
          <Col onClick={() => setStatus("")}>전체</Col>
          <Col onClick={() => setStatus(0)}>요청중</Col>
          <Col onClick={() => setStatus(1)}>협의중</Col>
          <Col onClick={() => setStatus(2)}>진행중</Col>
          <Col onClick={() => setStatus(3)}>종료</Col>
          <Col onClick={() => setStatus(4)}>파기</Col>
        </Row>
        <Row className='status_count'>
          <Col>{adList.length}</Col>
          <Col>{count(adList, 0)}</Col>
          <Col>{count(adList, 1)}</Col>
          <Col>{count(adList, 2)}</Col>
          <Col>{count(adList, 3)}</Col>
          <Col>{count(adList, 4)}</Col>
        </Row>
      </div>
    </Container>
  );
}

export default Status;