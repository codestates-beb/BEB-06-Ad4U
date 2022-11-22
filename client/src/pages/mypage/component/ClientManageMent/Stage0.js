import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import '../../Client.css';

const Stage0 = ({ adList }) => {
  const applicant = adList.Advertisement_has_Suppliers;

  //명단
  const ApplicantList = ({ idx, el }) => {
    const applicant = el.Supplier;
    if(applicant){
      return (
        <>
          <div>
            <div>{idx+1}번째 지원자</div>
            <span>채널명{applicant.channelName}</span>
            <span>: </span>
            <span>{applicant.channelUrl}</span>
          </div>
          <img src={applicant.profileImgUrl} alt="채널이미지" />
          <div>
            <div>구독자수{applicant.subscriberCount}</div> 
            <div>조회수{applicant.viewCount}</div>
          </div>
          <button>선택</button>
        </>
      );
    }
  }

  return (
    <>
      {applicant && applicant.map((el, idx)=><ApplicantList key={idx} idx={idx} el={el} />)}
    </>
  );
}

export default Stage0;