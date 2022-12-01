import React from 'react';
import Swal from 'sweetalert2';

import lockPdfImg from '../../../../dummyfiles/document.png';
import { handleFileImg, handleViewPdf } from '../../../../hooks/ipfs/getPdfFile';

import { AiOutlineFileExcel } from 'react-icons/ai';
import { Container, Row, Col, Image } from 'react-bootstrap';

import '../../Supplier.css';
import '../ContractDownload.css';

//파기
const Stage5 = ({ adList, setIsLoading }) => {

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
      <Container className='supplierManagement_container'>
        <Row className='supplierStage3_contentArea'>
          <Col className='completeCol'>
            <AiOutlineFileExcel size={200}/>
            <div>파기된 계약입니다.</div>
          </Col>
        <hr />
          <Row
            onMouseOver={handleFileImg}
            onMouseOut={handleFileImg}
            onClick={() => loadPdf(adList.token_uri, adList.title, adList.createdAt)}
          >
            <Col className='contractDownload'>
              <Image src={lockPdfImg} className="contractDownloadIcon"></Image>
              <span>계약서 다운로드</span>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default Stage5;