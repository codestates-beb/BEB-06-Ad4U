import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ad from '../../hooks/axios/ad';

import { Container, Row, Col } from 'react-bootstrap/esm';

import './detail.css';

const AdDetail = () => {
  const { adId } = useParams();
  const [detail, setDetail] = useState({
    Client : {company_name: "", email: ""}
  });
  console.log("Detail", detail)
  
  useEffect(() => {
    ad.getDetail(adId)
    .then(res=> setDetail(res.data))
    .catch(err => err.response.data)
  }, [])

  return (
    <>
      <Container className='detail_container'>
        <div> Ad Detail</div>
        <div>제목 {detail.title}</div>
        <div>내용 {detail.content}</div>
        <div>회사정보</div> 
        {/* detail.Client가 null일때 detail.Client.company_name를 불러오려고 하면 오류남 */}
        <div>회사명{detail.Client.company_name}</div>
        <div>회사이메일{detail.Client.email}</div> 
      </Container>
    </>
  );
}

export default AdDetail;