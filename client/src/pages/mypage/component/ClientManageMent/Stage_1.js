import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import '../../Client.css';

const Stage_1 = ({ adList }) => {

  // 1. Multi-Sig Wallet Deploy
  const handleDeploy = async () => {
    const supplierAddr = "0xebF43eF8B387652A862DaFE5990f264336C58DB5";
    const result = await method.multiSigWalletDeploy(supplierAddr);
    console.log(result)
  };

  // 3. Submit Transaction
  const handleSubmitTransaction = async () => {
    let walletAddress = "0x6B22a196da91253c4a975E5217BB5dA0a1469e81";
    let to = "0xebF43eF8B387652A862DaFE5990f264336C58DB5";
    let value = "0.1";
    let data = "web3 revoke test"
    const result = await method.submitTransaction(walletAddress,to,value,data);
    console.log(result)
  };

  return (
    <>
      <div>협의중</div>
      <button onClick={handleDeploy}>1. Multi-Sig Wallet Deploy</button>
      <button onClick={handleSubmitTransaction}>3. Submit Transaction</button>
    </>
  );
}

export default Stage_1;