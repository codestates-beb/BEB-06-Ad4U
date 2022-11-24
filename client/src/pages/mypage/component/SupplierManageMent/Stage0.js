import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import { getLocalData } from '../../../../config/localStrage';
import ad from '../../../../hooks/axios/ad';
import '../../Supplier.css';

//모집중
const Stage0 = ({ adList }) => {
  const adId = adList.id;
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

  return (
    <>
      <div>모집중</div>
      <button onClick={() => ad.callApplyCancel(accessToken, isClient, adId)}>지원 취소허기</button>
    </>
  );
}

export default Stage0;