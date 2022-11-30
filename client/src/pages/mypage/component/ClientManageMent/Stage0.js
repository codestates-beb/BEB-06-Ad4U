import React, { useEffect, useState } from 'react';
import method from '../../../../hooks/web3/sendTransaction';
import contract from '../../../../hooks/axios/contract';
import { getLocalData } from '../../../../config/localStrage';
import Avatar from 'react-avatar';
import Img from '../../../../dummyfiles/img1.png';
import { Container, Row, Col, Card, ListGroup, Form, Button, OverlayTrigger, Popover, CloseButton } from 'react-bootstrap';
import Swal from 'sweetalert2'
import Loading from '../../../../component/Loading';
import { TbTrashX } from 'react-icons/tb';
import ad from '../../../../hooks/axios/ad';

import '../../Client.css';
import '../TransactionButton.css';

//모집중
const Stage0 = ({ adList }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const applicant = adList.Advertisement_has_Suppliers;
  const adId = adList.id
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

    // 1. Multi-Sig Wallet Deploy
    const handleDeploy = async (supplierId, supplierAddr) => {
      //광고주 지갑주소랑, 크리에이터 지갑주소가 같을 시 에러남, 다른주소로!
      try {
        setIsLoading(true);
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
              setIsLoading(false);
            }
          }
        }
      } catch (err) {
        setIsLoading(false);
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
                onClick={async () => {
                  Swal.fire({
                    title: '선택한 유튜버와 계약을\n 진행하시겠습니까?',
                    html:
                    '<b>계약 생성시 해당 광고는 모집을 종료합니다.</b> ',
                    showCancelButton: true,
                    confirmButtonText: 'Progress',
                  }).then((result) => {
                      if (result.isConfirmed) {
                        window.scrollTo(0, 0)
                        handleDeploy(applicant.id, applicant.address)
                      }
                    })
                  }
                }
              >select</button>
            </Col>
          </Row>
          <Row><hr className='clientDivider_solid' /></Row>
        </>
      );
    }
  }

  const deleteAd = async () => {
    try {
      const result = await ad._delete(accessToken, isClient, adId);
      if (result) {
        setShowOverlay(false)
        await Swal.fire({
          icon: 'success',
          title: '광고가 삭제되었습니다.',
        })
        window.location.reload();
      }
    } catch(err) {
      setShowOverlay(false);
      console.log(err);
      await Swal.fire({
        icon: 'error',
        title: '에러발생',
      })
    }
  }

  return (
    <>
    {isLoading 
      ? <Loading /> 
      : <Container className='clientManagement_container'>
          {applicant.length === 0 
          ? <>
              <div className='clientStage0_emptyArea'>현재 지원자가 없습니다.</div>
              <hr className='clientDivider_solid' />
            </>
          : applicant.map((el, idx)=><ApplicantList key={idx} idx={idx} el={el} />)}
          <Col>
            <div className='clientStage0_footer' onClick={() => {
              Swal.fire({
                title: '해당 광고를 삭제하시겠습니까?',
                html:
                '<b>삭제된 광고는 복구할 수 없습니다.</b> ',
                showCancelButton: true,
                confirmButtonText: 'Confirm',
              }).then((result) => {
                  if (result.isConfirmed) return deleteAd();
                })
            }}>
            <TbTrashX size={20} /> 광고를 삭제하시겠습니까? </div>
          </Col>
        </Container>
      } 
    </>
  );
}

export default Stage0;