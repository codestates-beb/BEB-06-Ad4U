import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import contract from '../../../../hooks/axios/contract';
import { getLocalData } from '../../../../config/localStrage';
import '../../Supplier.css';
import '../TransactionButton.css';


const Stage1 = ({ adList }) => {
  const adId = adList.id;
  const contractAddress = adList.multisigAddress;
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

  // 2. Supplier Sign Wallet
  const handleSupplierSignWallet = async () => {
    try {
      const tx = await method.supplierSignWallet(contractAddress);
      if (tx) {
        const result = await contract.proceed(accessToken, isClient, adId);
        if (result) {
          alert("스마트컨트랙트에 서명하였습니다.");
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
      alert("트랜젝션 생성에 실패하였습니다.");
    }
  };

  return (
    <>
      <Container className='supplierManagement_container'>
        <Row className='supplierStage1_contentArea'>
          <Col xl={9}>
            <div className='supplierStage1_descriptionArea'>스마트컨트랙트가 블록체인에 배포되었습니다</div>
            <div className='supplierStage1_detailArea'>등록하신 지갑으로 스마트컨트랙트에 서명해주세요</div>
          </Col>
          <Col xl={3}><button className='transaction_Button sign' onClick={handleSupplierSignWallet}>Sign</button></Col>
        </Row>  
      </Container>
    </>
  );
}

export default Stage1;