import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import '../../Supplier.css';

const Stage0 = ({ adList }) => {
  // console.log(adList)
  // console.log("지원자명단", adList)

  return (
    <>
      <div>모집중</div>
      <div>지원 취소</div>
    </>
  );
}

export default Stage0;