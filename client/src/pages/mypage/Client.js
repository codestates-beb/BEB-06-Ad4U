import React from 'react';
import './Client.css';

import Profile from './component/Profile';
import Status from './component/Status';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Link } from 'react-router-dom';

const ClientMypage = () => {
  return (
    <Container className='clientMypage_container'>
      <Row className='clientMypage_row' >
        <Col xl={1}></Col>
        <Col xl={3} sm={5}  >
          <Row>
            <Profile />
            <div className='viewall'>
              <Link to="/upload"><button className='viewall_btn'><span>광고 업로드</span></button></Link>
            </div>
          </Row>
        </Col>
        <Col xl={7} sm={7} >
        <Row>
          <h1> Client Mypage</h1>
          <Status />
        </Row>
        </Col>  
        <Col xl={1}></Col>        
      </Row>
    </Container>
  );
}

export default ClientMypage;


