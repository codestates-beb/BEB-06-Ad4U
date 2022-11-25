import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import '../../Client.css';

//진행중1
const Stage2 = ({ adList }) => {
  const adId = adList.id;
  
  return (
    <>
      <div>진행중1</div>
      <Link to={`/mypage/client/contract/${adId}`}>계약서 작성하러가기</Link>
    </>
  );
}

export default Stage2;