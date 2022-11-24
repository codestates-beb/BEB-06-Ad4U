import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import { getLocalData } from '../../../../config/localStrage';
import '../../Supplier.css';

//협의중
const Stage1 = ({ adList }) => {
  const adId = adList.id;
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

  return (
    <>
      <div>협의중</div>
      <div>광고주가 계약서를 작성중입니다.</div>
    </>
  );
}

export default Stage1;