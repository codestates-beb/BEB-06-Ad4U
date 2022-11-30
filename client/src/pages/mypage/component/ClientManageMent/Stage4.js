import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container, Image } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import '../../Client.css';

import lockPdfImg from '../../../../dummyfiles/document.png';
import downloadPdfImg from '../../../../dummyfiles/download-pdf.png';
import completeImg from '../../../../dummyfiles/checked.png';
import axios from 'axios';
import crypto from 'crypto-js';
import {triggerBase64Download} from 'common-base64-downloader-react';
import Loading from '../../../../component/Loading';

//완료
const Stage4 = ({ adList }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileImg = (e) => {
    if(e.target.src === downloadPdfImg) {
      e.target.src = lockPdfImg;
    } else {
      e.target.src=downloadPdfImg;
    }
  }
  const dataURLtoBase64 = (dataurl) => {
 
    var arr = dataurl.split(',')
    
    return arr[1];
  }

  const handleViewPdf = async () => {
    console.log(adList);
    const secretKey = process.env.REACT_APP_SECRET_KEY;

      const options = {
        url: adList.token_uri,
        method: 'GET',
        headers: {"Content-Type": "application/json"}
      }
      
      await axios.request(options)
      .then(res => {
        setIsLoading(true);
        console.log(res.data)
        //복호화
          const bytes = crypto.AES.decrypt(res.data, secretKey);
          const decrypted = bytes.toString(crypto.enc.Utf8);
          const decrypted_base64 = "data:application/pdf;base64,"+dataURLtoBase64(decrypted);
          triggerBase64Download(decrypted_base64, `${adList.title}_${adList.createdAt}`)
        setIsLoading(false)
      })
  }

  return (
    <>
      {isLoading 
        ? <Loading /> 
        : <Container className='management_container'>
            <Row className='stage3_contentArea'>
              <Col className='completeCol'>
                <Image src={completeImg} className="completeIcon"></Image>
                Complete
              </Col>
            <hr></hr>
                  <Row
                    onMouseOver={handleFileImg}
                    onMouseOut={handleFileImg}
                    onClick={handleViewPdf}
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