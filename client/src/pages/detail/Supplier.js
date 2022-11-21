import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supplier from '../../hooks/axios/supplier';

import { Container, Row, Col } from 'react-bootstrap/esm';

import './Detail.css';

const SupplierDetail = () => {
  const { supplierId } = useParams();
  const [detail, setDetail] = useState({});
  console.log("Detail", detail)

  useEffect(() => {
    supplier.getDetail(supplierId)
    .then(res=> setDetail(res.data))
    .catch(err => err.response.data)
  }, [])

  return (
    <>
      <Container className='supplierDetail_container'>
        <div> supplier Detail</div>
        <div>채널명 {detail.channelName}</div>
        <div>채널 주소{detail.channelUrl}</div>
        <div>이메일 {detail.email}</div>
        <div>구독자수 {detail.subscriberCount}</div>
      </Container> 
    </>
  );
}

export default SupplierDetail;