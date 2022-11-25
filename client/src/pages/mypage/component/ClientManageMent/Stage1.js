import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import '../../Client.css';


//협의중
const Stage1 = ({ adList }) => {
  const adId = adList.id;

  return (
    <>
      <div>협의중</div>
      <div>크리에이터의 컨트랙트 서명을 기다리고 있습니다.</div>
    </>
  );
}

export default Stage1;