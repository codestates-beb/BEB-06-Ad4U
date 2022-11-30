import React, { useEffect, useState } from 'react';
import method from '../../../../hooks/web3/sendTransaction';
import contract from '../../../../hooks/axios/contract';
import { getLocalData } from '../../../../config/localStrage';
import Avatar from 'react-avatar';
import Img from '../../../../dummyfiles/img1.png';
import { Container, Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap';
import '../../Client.css';
import '../TransactionButton.css';
import Loading from '../../../../component/Loading';

//모집중
const Stage0 = ({ adList }) => {
  const [isLoading, setIsLoading] = useState(false);
  const applicant = adList.Advertisement_has_Suppliers;
  const adId = adList.id
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

    // 1. Multi-Sig Wallet Deploy
    const handleDeploy = async (supplierId, supplierAddr) => {
      //광고주 지갑주소랑, 크리에이터 지갑주소가 같을 시 에러남, 다른주소로!
      try {
        if (isClient === "false") return alert("광고주 계정으로만 이용가능합니다.");
        setIsLoading(true);
        if (accessToken && isClient && supplierId && adId) {
          const tx = await method.multiSigWalletDeploy(supplierAddr);
          const contractAddress = tx._address;
          if (contractAddress) {
            const result = await contract.conference(accessToken, isClient, supplierId, adId, contractAddress)
            if (result) {
              alert("contract deploy is success!");
              window.location.reload();
              setIsLoading(false)
            }
            
          } else return alert("다시 로그인 해주세요");
        }
      } catch (err) {
        console.log(err);
        alert("contract deploy is fail!");
      }
    };

  //명단
  const ApplicantList = ({ idx, el }) => {
    const applicant = el.Supplier;
    if(applicant){
      return (
        <>
          <Row>
            <Col className='stage0_ImgArea' xl={2}>
              {applicant.profileImgUrl
              ? <Avatar src={applicant.profileImgUrl} alt="채널이미지" />
              : <Avatar src={Img} alt="채널 대체이미지" />}
            </Col>
            <Col className='stage0_contentArea' xl={7}>
              <div>{idx+1}번째 지원자</div>
              <span>채널명 {applicant.channelName}</span>
              <div><a className='channelUrl' href={applicant.channelUrl}>{applicant.channelUrl}</a></div>
              <div>구독자수 {applicant.subscriberCount}</div> 
              <div>조회수 {applicant.viewCount}</div>
            </Col>
            <Col className='stage0_buttonArea' xl={3}>
              <button 
                className='transaction_Button select' 
                onClick={() => handleDeploy(applicant.id, applicant.address)}
              >select</button>
            </Col>
          </Row>
          <Row><hr className='divider_solid' /></Row>
            
        </>
      );
    }
  }

  return (
    <>
      {isLoading 
        ? <Loading /> 
        : <Container className='management_container'>
            {applicant.length === 0 
            ? <div className='stage0_emptyArea'>현재 지원자가 없습니다.</div>
            : applicant.map((el, idx)=><ApplicantList key={idx} idx={idx} el={el} />)}
          </Container>
      }
    </>
  );
}

export default Stage0;