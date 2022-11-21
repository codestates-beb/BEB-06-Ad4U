import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../hooks/axios/auth';
import './Supplier.css';

import Profile from '../common/Profile';
import Status from './component/Status';
import { Container, Accordion, Row, Col } from 'react-bootstrap';

const SupplierMypage = ({ userData }) => {
  const { isClient, accessToken } = userData;
  const [myInfo, setMyInfo] = useState({});
  const [adList, setAdlist] = useState([]);

  const navigate = useNavigate();
  //client는 접근할 수 없음
  if(isClient === true) navigate('./*');

  useEffect(() => {
    auth.getMypage(isClient, accessToken)
    .then(res => res.data)
    .then(data => {
      setAdlist([data.Advertisement_has_Suppliers]);
      delete data.Advertisement_has_Suppliers;
      setMyInfo(data);
    })
    .catch(err => console.log(err.response.data))
  }, [])

  return (
    <Container className='supplierMypage_container'>
      <Row className='supplierMypage_row' >
        <Col xl={3} >
          <Profile userData={userData}/>
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
