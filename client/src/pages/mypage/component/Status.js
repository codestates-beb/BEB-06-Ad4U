import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';

import './Status.css'

const Status = ({ adList, setStatus }) => {
  const [count, setCount] = useState({ status0: 0, status1: 0, status2: 0, status3: 0, status4: 0 })

  useEffect(() => {
    let status0 = 0, status1 = 0, status2 = 0, status3 = 0, status4 = 0;
    adList.forEach(el => {
      if (el.status === 0) return status0++;
      if (el.status === 1) return status1++;
      if (el.status === 2) return status2++;
      if (el.status === 3) return status3++;
      if (el.status === 4) return status4++;
      else return ;
    })
    setCount({ status0, status1, status2, status3, status4 });
  }, [adList]);

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
          <Col>{count.status0}</Col>
          <Col>{count.status1}</Col>
          <Col>{count.status2}</Col>
          <Col>{count.status3}</Col>
          <Col>{count.status4}</Col>
        </Row>
      </div>
    </Container>
  );
}

export default Status;