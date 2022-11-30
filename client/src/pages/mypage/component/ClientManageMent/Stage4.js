import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container, Image } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';

//lock downloadPdfImg 둘다 필요함.
import lockPdfImg from '../../../../dummyfiles/document.png';
import downloadPdfImg from '../../../../dummyfiles/download-pdf.png';
import completeImg from '../../../../dummyfiles/checked.png';
import { handleFileImg, handleViewPdf } from '../../../../hooks/ipfs/getPdfFile';
import Swal from 'sweetalert2';
import Loading from '../../../../component/Loading';

import '../../Client.css';
import '../ContractDownload.css';

//완료
const Stage4 = ({ adList }) => {
  const [isLoading, setIsLoading] = useState(false);

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
      {isLoading
      ? <Loading />
      : <Container className='clientStageManagement_container'>
          <Row className='clientStage4_contentArea'>
            <Col className='completeCol'>
              <Image src={completeImg} className="completeIcon"></Image>
              Complete
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

export default Stage4;