import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import '../../Client.css';

const Stage1 = ({ adList }) => {

  // 1. Multi-Sig Wallet Deploy
  const handleDeploy = async () => {
    const supplierAddr = "0xebF43eF8B387652A862DaFE5990f264336C58DB5";
    const result = await method.multiSigWalletDeploy(supplierAddr);
    console.log(result)
  };

  return (
    <>
      <div>협의중</div>
      <button onClick={handleDeploy}>1. Multi-Sig Wallet Deploy</button>
      <Link to="/contract">계약서 작성</Link>
    </>
  );
}

export default Stage1;