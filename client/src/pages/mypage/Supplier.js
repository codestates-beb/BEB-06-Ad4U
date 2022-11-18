import React from 'react';
import './Supplier.css';

import Profile from './component/Profile';
import Status from './component/Status';
import { Container, Accordion, Row, Col } from 'react-bootstrap';


const SupplierMypage = () => {
  return (
    <Container className='supplierMypage_container'>
      <Row className='supplierMypage_row' >
        <Col xl={3} >
          <Profile />
        </Col>
        <Col xl={9} >
        <Row>
          <h1> Supplier Mypage</h1>
          <Status />
          <Container className='supplierMypage_accordion'>
            <Accordion defaultActiveKey={['0']}>
              <Accordion.Item>
                <Accordion.Header>
                  <Row className='supplier_header'>
                    <Col>지원회사</Col>
                    <Col>광고title</Col>
                    <Col>진행상태</Col>
                    <Col>tokenId</Col>
                    <Col>Mint</Col>
                  </Row>
                </Accordion.Header>
              <Accordion.Body>

              </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion defaultActiveKey={['0']}>
              <Accordion.Item>
                <Accordion.Header>
                  <Row className='supplier_header'>
                    <Col>지원회사</Col>
                    <Col>광고title</Col>
                    <Col>진행상태</Col>
                    <Col>tokenId</Col>
                    <Col>Mint</Col>
                  </Row>
                </Accordion.Header>
              <Accordion.Body>

              </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion defaultActiveKey={['0']}>
              <Accordion.Item>
                <Accordion.Header>
                  <Row className='supplier_header'>
                    <Col>지원회사</Col>
                    <Col>광고title</Col>
                    <Col>진행상태</Col>
                    <Col>tokenId</Col>
                    <Col>Mint</Col>
                  </Row>
                </Accordion.Header>
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

export default SupplierMypage;
