import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import contract from '../../../../hooks/axios/contract';
import { getLocalData } from '../../../../config/localStrage';
import Loading from '../../../../component/Loading';
import '../../Supplier.css';
import '../TransactionButton.css';
import Swal from 'sweetalert2'

const Stage1 = ({ adList }) => {
  const adId = adList.id;
  const contractAddress = adList.multisigAddress;
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

  const [isLoading, setIsLoading] = useState(false);

  // 2. Supplier Sign Wallet
  const handleSupplierSignWallet = async () => {
    try {
      setIsLoading(true);
      const tx = await method.supplierSignWallet(contractAddress);
      if (tx) {
        const result = await contract.proceed(accessToken, isClient, adId);
        if (result) {
          setIsLoading(false);
          await Swal.fire({
            icon: 'success',
            title: '스마트컨트랙트에 서명이 성공적으로 완료되었습니다!',
          })
          window.location.reload();
        }
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      await Swal.fire({
        icon: 'error',
        title: '트랜잭션 오류...',
      })
    }
  };

  return (
    <>
      {isLoading 
      ? <Loading />
      : <Container className='supplierManagement_container'>
        <Row className='supplierStage1_contentArea'>
          <Col xl={9}>
            <div className='supplierStage1_descriptionArea'>스마트컨트랙트가 블록체인에 배포되었습니다</div>
            <div className='supplierStage1_detailArea'>등록하신 지갑으로 스마트컨트랙트에 서명해주세요</div>
          </Col>
          <Col xl={3}><button className='transaction_Button sign' onClick={() => {
            Swal.fire({
              title: '해당 계약에\n 서명하시겠습니까?',
              html:
              '<b>계약 서명시 해당 광고에 참여하게 됩니다.</b> ',
              showCancelButton: true,
              confirmButtonText: 'Sign',
            }).then((result) => {
                if (result.isConfirmed) {
                  handleSupplierSignWallet();
                }
              })
          }}>Sign</button></Col>
        </Row>  
      </Container>
      }
    </>
  );
}

export default Stage1;