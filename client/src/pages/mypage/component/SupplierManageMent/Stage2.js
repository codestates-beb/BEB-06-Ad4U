import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import { getLocalData } from '../../../../config/localStrage';
import contract from '../../../../hooks/axios/contract';
import method from '../../../../hooks/web3/sendTransaction';
import '../../Supplier.css';

//진행중1
const Stage2 = ({ adList }) => {
  const adId = adList.id;
  const contractAddress = adList.multisigAddress;
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

  return (
    <>
      <Container className='supplierManagement_container'>
        <Col className='supplierStage2_contentArea'><div>광고주가 계약서를 작성중입니다.</div></Col>       
      </Container>
    </>
  );
}

export default Stage2;