import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SBT.css';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';


import lockPdfImg from '../../../../dummyfiles/document.png';
import downloadPdfImg from '../../../../dummyfiles/download-pdf.png';
import axios from 'axios';
import crypto from 'crypto-js';
import {triggerBase64Download} from 'common-base64-downloader-react';



const SBTView = ({ userData, adList }) => {
  // console.log(adList)
  const [list, setList] = useState([]);
  const [sbtList, setSbtList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setSbtList(adList.filter(element => {
        return element.status > 2;
    }));
    console.log(sbtList)
  }, [adList])

  const dataURLtoBase64 = (dataurl) => {
 
    var arr = dataurl.split(',')
    
    return arr[1];
  }

  const handleFileImg = (e) => {
    if(e.target.src === downloadPdfImg) {
      e.target.src = lockPdfImg;
    } else {
      e.target.src=downloadPdfImg;
    }
  }


  const handleViewPdf = async (data) => {
    const secretKey = process.env.REACT_APP_SECRET_KEY;
    console.log(data)
    console.log(data.token_uri)
      const options = {
        url: data.token_uri,
        method: 'GET',
        headers: {"Content-Type": "application/json"}
      }
      
      await axios.request(options)
      .then(res => {
        console.log(res.data)
        //복호화
          const bytes = crypto.AES.decrypt(res.data, secretKey);
          const decrypted = bytes.toString(crypto.enc.Utf8);
          const decrypted_base64 = "data:application/pdf;base64,"+dataURLtoBase64(decrypted);
          triggerBase64Download(decrypted_base64, `${data.title}_${data.createdAt}`)
      })
  }

  

  return (
      <Container className='sbtContainer'>
        <h3 className='sbtTitle'>나의 등록된 계약서 확인</h3>
        <div className="sbt-content">
          {sbtList.map((data, idx) => { return (
                  <div 
                  className="sbt-content_card-container"
                  onClick = {() => {
                    handleViewPdf(data)
                  }}
                  key={idx}
                  >
                    <Card.Img variant='top' src={lockPdfImg}
                      onMouseOver={handleFileImg}
                      onMouseOut={handleFileImg}
                    />
                      <Card.Body>
                          <Card.Title className='sbtAdTitle'>{data.title}</Card.Title>
                      </Card.Body>
                  </div>
              )})}
          </div>
      </Container>
  );
}

export default SBTView;