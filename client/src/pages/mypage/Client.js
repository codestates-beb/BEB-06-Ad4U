import React from 'react';
import './Client.css';

import Profile from './component/Profile';
import Status from './component/Status';
import { Link } from 'react-router-dom';
import {Accordion, Col, Row, Container} from 'react-bootstrap';

const ClientMypage = () => {
  return (
    <Container className='clientMypage_container'>
      <Row className='clientMypage_row' >
        <Col xl={3} >
          <Row>
            <Profile />
            <div className='clientupload'>
              <Link to="/upload"><button className='clientupload_btn'><span>광고 업로드</span></button></Link>
            </div>
          </Row>
        </Col>
        <Col xl={9}  >
        <Row>
          <h1> Client Mypage</h1>
          <Status />
          <Container className='clientMypage_accordion'>
            <Accordion defaultActiveKey={['0']}>
              <Accordion.Item>
              <Accordion.Header>광고 #1</Accordion.Header>
              <Accordion.Body>

              </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            
            <Accordion defaultActiveKey={['0']}>
              <Accordion.Item>
              <Accordion.Header>광고 #2</Accordion.Header>
              <Accordion.Body>
                
              </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion defaultActiveKey={['0']}>
              <Accordion.Item>
              <Accordion.Header>광고 #3</Accordion.Header>
              <Accordion.Body>
                
              </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Container>
        </Row>
        </Col>       
      </Row>
    </Container>
  );
}

export default ClientMypage;


