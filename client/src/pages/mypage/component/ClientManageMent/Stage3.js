import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Col, Row, Stack, Image} from 'react-bootstrap';
import { getLocalData } from '../../../../config/localStrage';
import contract from '../../../../hooks/axios/contract';
import method from '../../../../hooks/web3/sendTransaction';
import { TbChecklist } from "react-icons/tb";


import { getIsConfirmed, getTransaction } from '../../../../hooks/web3/queryContract';
import { getCurrentAccount } from '../../../../hooks/web3/common';

import lockPdfImg from '../../../../dummyfiles/document.png';
import downloadPdfImg from '../../../../dummyfiles/download-pdf.png';
import axios from 'axios';
import crypto from 'crypto-js';
import {triggerBase64Download} from 'common-base64-downloader-react';

import '../TransactionButton.css';
import '../../Client.css';
import Loading from '../../../../component/Loading';

//진행중2
const Stage3 = ({ adList }) => {
  console.log(adList)
  const adId = adList.id;
  const contractAddress = adList.multisigAddress;
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

  const [confirmCheck, setConfirmCheck] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  let txIndex = 0;

  //confirmCheck : 이미 컨펌된 경우 disable
  const isConfirmed = async () => {
    const account = await getCurrentAccount(); // 현재 계정 주소 get
    const result = await getIsConfirmed(contractAddress, 0, account);
    if (result === false) return setConfirmCheck(result);
    else { 
      alert("이미 confirm된 계약입니다!");
    }
  }

  // 4. Confirm Transaction
  const handleConfirmTransaction = async () => { 
    setIsLoading(true);
    try {
      const tx = await method.confirmTransaction(contractAddress, txIndex);
      console.log(tx)
      if (tx) {
        const txInfo = await getTransaction(contractAddress, 0);
        const confirmCount = txInfo.numConfirmations; // 현재 계약 컨펌 개수
        if (confirmCount === 2) {  //Confirm 두개가 됬을 경우, 서버로 결과를 보냄
          const result = await contract.complete(accessToken, isClient, adId);
          if (result) {
            alert("양쪽에서 confirm이 되었습니다 계약을 성공적으로 완료합니다.");
            window.location.reload();
            setIsLoading(false)
          }
        }
        else {
          alert("confirm 완료!");
        }
      }
    } catch (err) {
      console.log(err);
      alert("트랜잭션 생성에 실패하였습니다.");
    }
  };

  // 5. Revoke Transaction
  const handleRevokeConfirmation = async () => {
    setIsLoading(true);
    try {
      const tx = await method.revokeConfirmation(contractAddress, txIndex);
      console.log(tx);
      if (tx) {
        const result = await contract.cancel(accessToken, isClient, adId);
        if (result) {
          alert("계약이 파기되었습니다.");
          window.location.reload();
          setIsLoading(false)
        }
      }
    } catch(err) {
      console.log(err);
      alert("트랜젝션 생성에 실패하였습니다.");
    }
  };

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
        console.log(res.data)
        //복호화
          const bytes = crypto.AES.decrypt(res.data, secretKey);
          const decrypted = bytes.toString(crypto.enc.Utf8);
          const decrypted_base64 = "data:application/pdf;base64,"+dataURLtoBase64(decrypted);
          triggerBase64Download(decrypted_base64, `${adList.title}_${adList.createdAt}`)
      })
  }

  return (
    <>
      {isLoading 
        ? <Loading /> 
        : <Container className='management_container'>
            <Row className='stage3_contentArea'>
              <Col xl={7}>
                <Row className='stage3_descriptionArea'>{adList.title} 광고계약이 현재 진행중입니다.</Row>
                <Row className='stage3_detailArea'>confirm으로 계약을 완료시키거나 revoke로 파기할 수 있습니다.</Row>
              </Col>
              <Col xl={5}>          
                {confirmCheck
                ? <button id='check_button' className='transaction_Button check' onClick={isConfirmed}>Check!</button> 
                : <button id='confirm_button' className='transaction_Button confirm' onClick={handleConfirmTransaction}>Confirm</button>}
                <button className='transaction_Button revoke' onClick={handleRevokeConfirmation}>Revoke</button>
                <br></br>
                <br></br>
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

export default Stage3;