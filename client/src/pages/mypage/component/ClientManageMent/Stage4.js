import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container, Image } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import '../../Client.css';
//lock downloadPdfImg 둘다 필요함.
import lockPdfImg from '../../../../dummyfiles/document.png';
import downloadPdfImg from '../../../../dummyfiles/download-pdf.png';
import completeImg from '../../../../dummyfiles/checked.png';
import { handleFileImg, handleViewPdf } from '../../../../hooks/ipfs/getPdfFile';

//완료
const Stage4 = ({ adList }) => {

  return (
    <>
      <Container className='management_container'>
        <Row className='stage3_contentArea'>
          <Col className='completeCol'>
            <Image src={completeImg} className="completeIcon"></Image>
            Complete
          </Col>
        <hr />
          <Row
            onMouseOver={handleFileImg}
            onMouseOut={handleFileImg}
            onClick={() => handleViewPdf(adList.token_uri, adList.title, adList.createdAt)}
          >
            <Image src={lockPdfImg} className="contractDownloadIcon"></Image>
            <Col className='contractDownload'>
                계약서 다운로드
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default Stage4;