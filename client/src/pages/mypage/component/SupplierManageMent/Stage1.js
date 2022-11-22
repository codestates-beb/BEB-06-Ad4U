import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import '../../Supplier.css';

const Stage1 = ({ adList }) => {

  // 2. Supplier Sign Wallet
  const handleSupplierSignWallet = async () => {
    let walletAddress = "0x6B22a196da91253c4a975E5217BB5dA0a1469e81";
    const result = await method.supplierSignWallet(walletAddress);
    console.log(result)
  };

  return (
    <>
      <div>협의중</div>
      <button onClick={handleSupplierSignWallet}>2. Supplier Sign Wallet</button>
      <div>SBT 토큰 민팅</div>
    </>
  );
}

export default Stage1;