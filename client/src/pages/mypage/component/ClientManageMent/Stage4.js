import React, { useCallback } from 'react';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';

import lockPdfImg from '../../../../dummyfiles/document.png';
import { handleFileImg, handleViewPdf } from '../../../../hooks/ipfs/getPdfFile';

import { GiPartyPopper } from 'react-icons/gi';
import { Col, Row, Container, Image } from 'react-bootstrap';

import '../../Client.css';
import '../ContractDownload.css';

//완료
const Stage4 = ({ adList, setIsLoading }) => {

  const loadPdf = async (token_uri, title, createdAt) => {
    try {
      setIsLoading(true);
      await handleViewPdf(token_uri, title, createdAt);
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
      <Container className='clientStageManagement_container'>
        <Row 
          className='clientStage4_contentArea' 
          onClick={() => {
            confetti({
              particleCount: 150,
              spread: 60
            });
          }
        }>
          <Col className='completeCol'>
            <GiPartyPopper size={200}/>
            <div>계약이 성공적으로 완료되었습니다!</div>
          </Col>
        <hr />
          <Row
            onMouseOver={handleFileImg}
            onMouseOut={handleFileImg}
            onClick={() => loadPdf(adList.token_uri, adList.title, adList.createdAt)}
          >
            <Col className='contractDownload'>
              <Image src={lockPdfImg} className="contractDownloadIcon"></Image>
              계약서 다운로드
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default Stage4;