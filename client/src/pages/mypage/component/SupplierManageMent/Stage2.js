import React from 'react';

import { Col, Container } from 'react-bootstrap';

import '../../Supplier.css';

//진행중1
const Stage2 = () => {
  return (
    <>
      <Container className='supplierManagement_container'>
        <Col className='supplierStage2_contentArea'><div>광고주가 계약서를 작성중입니다.</div></Col>       
      </Container>
    </>
  );
}

export default Stage2;