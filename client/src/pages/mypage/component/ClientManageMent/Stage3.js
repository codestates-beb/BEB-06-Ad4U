import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Stack, Image} from 'react-bootstrap';
import { getLocalData } from '../../../../config/localStrage';
import contract from '../../../../hooks/axios/contract';
import method from '../../../../hooks/web3/sendTransaction';

import { getIsConfirmed, getTransaction } from '../../../../hooks/web3/queryContract';
import { getCurrentAccount } from '../../../../hooks/web3/common';

//lock downloadPdfImg 둘다 필요함.
import lockPdfImg from '../../../../dummyfiles/document.png';
import downloadPdfImg from '../../../../dummyfiles/download-pdf.png';
import { handleFileImg, handleViewPdf } from '../../../../hooks/ipfs/getPdfFile';
import Swal from 'sweetalert2';
import Loading from '../../../../component/Loading';

import '../TransactionButton.css';
import '../../Client.css';
import '../ContractDownload.css';


//진행중2
const Stage3 = ({ adList }) => {
  console.log(adList)
  const adId = adList.id;
  const contractAddress = adList.multisigAddress;
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

  const [confirmCheck, setConfirmCheck] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmCheck2, setConfirmCheck2] = useState(false);

  let txIndex = 0;

  //confirmCheck : 이미 컨펌된 경우 disable
  const isConfirmed = async () => {
    const account = await getCurrentAccount(); // 현재 계정 주소 get
    const result = await getIsConfirmed(contractAddress, 0, account);
    if (result === false) return setConfirmCheck(result);
    else { 
      await Swal.fire({
        icon: 'error',
        title: '이미 Confirm된 계약입니다!',
      });
    }
  }

  // 4. Confirm Transaction
  const handleConfirmTransaction = async () => { 

    try {
      if(confirmCheck2 === true) {
        await Swal.fire({
          icon: 'error',
          title: '이미 Confirm된 계약입니다!',
        });
      }
      setIsLoading(true);
      const tx = await method.confirmTransaction(contractAddress, txIndex);
      console.log(tx)
      if (tx) {
        const txInfo = await getTransaction(contractAddress, 0);
        const confirmCount = txInfo.numConfirmations; // 현재 계약 컨펌 개수
        if (confirmCount === 2) {  //Confirm 두개가 됬을 경우, 서버로 결과를 보냄
          const result = await contract.complete(accessToken, isClient, adId);
          if (result) {
            setConfirmCheck2(true);
            setIsLoading(false);
            await Swal.fire({
              icon: 'success',
              title: '상호 계약이 성공적으로 완료되었습니다!',
            });
            window.location.reload();
            
          }
        } else {  //Confirm 하나인경우는 서버로 보내지 않음.
          setConfirmCheck2(true);  
          setIsLoading(false);
          await Swal.fire({
            icon: 'success',
            title: 'Confirm 완료!',
          });
        }
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      await Swal.fire({
        icon: 'error',
        title: '트랜잭션 오류 발생...',
      });
      setIsLoading(false);
    }
  };

  // 5. Revoke Transaction
  const handleRevokeConfirmation = async () => {
    try {
      setIsLoading(true);
      const tx = await method.revokeConfirmation(contractAddress, txIndex);
      console.log(tx);
      if (tx) {
        const result = await contract.cancel(accessToken, isClient, adId);
        if (result) {
          setIsLoading(false);
          await Swal.fire({
            icon: 'success',
            title: '계약 파기 완료',
          });
          window.location.reload();
        }
      }
    } catch(err) {
      setIsLoading(false);
      console.log(err);
      await Swal.fire({
        icon: 'error',
        title: '트랜잭션 오류 발생...',
      });
      setIsLoading(false);
    }
  };

  const loadPdf = async (token_uri, title, createdAt) => {
    try {
    setIsLoading(true);
    handleViewPdf(token_uri, title, createdAt);
    setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      await Swal.fire({
        icon: 'error',
        title: '계약서 발급이 실패하였습니다.',
      });
    }
  };

  return (
    <>
      {isLoading 
      ? <Loading /> 
      : <Container className='clientManagement_container'>
          <Row className='clientStage3_contentArea'>
            <Col xl={7}>
              <Row className='clientStage3_descriptionArea'>{adList.title} 광고계약이 현재 진행중입니다.</Row>
              <Row className='clientStage3_detailArea'>confirm으로 계약을 완료시키거나 revoke로 파기할 수 있습니다.</Row>
            </Col>
            <Col xl={5}>          
              {confirmCheck
              ? <button className='transaction_Button check' onClick={isConfirmed}>Check!</button> 
              : <button className='transaction_Button confirm' onClick={() =>{
                Swal.fire({
                  title: '계약을 완료하시겠습니까?',
                  html:
                  '<b>계약 대상자 모두 계약을 완료(Confirm)하면 예치된 금액이 크리에이터님 지갑으로 송금되며,\n 계약은 완료상태로, 파기가 불가합니다. </b> ',
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: 'Progress',
                  denyButtonText: `Don't Proceed`,
                }).then((result) => {
                    if (result.isConfirmed) {
                      window.scrollTo(0, 0)
                      handleConfirmTransaction();
                    } else if (result.isDenied) {
                      Swal.fire('계약 완료 취소', '', 'info')
                      window.location.reload();
                    }
                  })
              }}>Confirm</button>}
              <button className='transaction_Button revoke' onClick={()=> {
                Swal.fire({
                  title: '계약을 파기하시겠습니까?',
                  html:
                  '<b>계약 파기시 예치된 금액은 광고주님에게로 돌아가며,\n 계약은 파기상태로, 되돌릴 수 없습니다.</b> ',
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: 'Progress',
                  denyButtonText: `Don't Proceed`,
                }).then((result) => {
                    if (result.isConfirmed) {
                      window.scrollTo(0, 0)
                      handleRevokeConfirmation();
                    } else if (result.isDenied) {
                      Swal.fire('계약 파기 취소', '', 'info')
                      window.location.reload();
                    }
                  })
              }}>Revoke</button>
              <br />
              <br />
            </Col>
            <hr />
          <Row
            onMouseOver={handleFileImg}
            onMouseOut={handleFileImg}
            onClick={() => loadPdf(adList.token_uri, adList.title, adList.createdAt)}
          >
            <Image src={lockPdfImg} className="contractDownloadIcon"></Image>
            <Col className='contractDownload'>
                계약서 다운로드
                </Col>
            </Row>
          </Row>
        </Container>
      }
    </>
  );
}

export default Stage3;