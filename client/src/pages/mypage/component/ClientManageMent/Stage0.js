import React, { useEffect, useState } from 'react';
import method from '../../../../hooks/web3/sendTransaction';
import contract from '../../../../hooks/axios/contract';
import { getLocalData } from '../../../../config/localStrage';
import Avatar from 'react-avatar';
import Img from '../../../../dummyfiles/img1.png';
import { Container, Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'
import '../../Client.css';
import '../TransactionButton.css';

//모집중
const Stage0 = ({ adList }) => {
  const applicant = adList.Advertisement_has_Suppliers;
  const adId = adList.id
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

    // 1. Multi-Sig Wallet Deploy
    const handleDeploy = async (supplierId, supplierAddr) => {
      //광고주 지갑주소랑, 크리에이터 지갑주소가 같을 시 에러남, 다른주소로!
      try {
        if (isClient === "false") {
          await Swal.fire({
            icon: 'error',
            title: '광고주 계정으로만 실행 가능합니다!',
          })
        }
        if (accessToken && isClient && supplierId && adId) {
          const tx = await method.multiSigWalletDeploy(supplierAddr);
          const contractAddress = tx._address;
          if (contractAddress) {
            const result = await contract.conference(accessToken, isClient, supplierId, adId, contractAddress)
            if (result) {
              await Swal.fire({
                icon: 'success',
                title: '계약 생성 완료!',
              })
              window.location.reload();
            }
          } else {
            await Swal.fire({
              icon: 'error',
              title: '계정 오류!',
            })
          }
        }
      } catch (err) {
        console.log(err);
        await Swal.fire({
          icon: 'error',
          title: '계약 생성 실패..',
        })
      }
    };

  //명단
  const ApplicantList = ({ idx, el }) => {
    const applicant = el.Supplier;
    if(applicant){
      return (
        <>
          <Row>
            <Col className='clientStage0_ImgArea' xl={2}>
              {applicant.profileImgUrl
              ? <Avatar src={applicant.profileImgUrl} alt="채널이미지" />
              : <Avatar src={Img} alt="채널 대체이미지" />}
            </Col>
            <Col className='clientStage0_contentArea' xl={7}>
              <div>{idx+1}번째 지원자</div>
              <span>채널명 {applicant.channelName}</span>
              <div><a className='clientChannelUrl' href={applicant.channelUrl}>{applicant.channelUrl}</a></div>
              <div>구독자수 {applicant.subscriberCount}</div> 
              <div>조회수 {applicant.viewCount}</div>
            </Col>
            <Col className='clientStage0_buttonArea' xl={3}>
              <button 
                className='transaction_Button select' 
                onClick={() => handleDeploy(applicant.id, applicant.address)}
              >select</button>
            </Col>
          </Row>
          <Row><hr className='clientDivider_solid' /></Row>
        </>
      );
    }
  }

  return (
    <>
      <Container className='clientManagement_container'>
        {applicant.length === 0 
        ? <div className='clientStage0_emptyArea'>현재 지원자가 없습니다.</div>
        : applicant.map((el, idx)=><ApplicantList key={idx} idx={idx} el={el} />)}
      </Container>
    </>
  );
}

export default Stage0;