import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import '../../Client.css';

//진행중1
const Stage2 = ({ adList }) => {
  const adId = adList.id;
  
  return (
    <>
      <div>크리에이터의 컨트랙트 서명을 기다리고 있습니다.</div>
    </>
  );
}

export default Stage2;