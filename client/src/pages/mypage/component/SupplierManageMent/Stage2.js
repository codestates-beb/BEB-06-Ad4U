import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import '../../Supplier.css';

const Stage2 = ({ adList }) => {

    // 2. Supplier Sign Wallet
    const handleSupplierSignWallet = async () => {
      let walletAddress = "0x28ED9A3C343240B3bd2A811c1Ba6caEb45e7A98C";
      const result = await method.supplierSignWallet(walletAddress);
      console.log(result)
    };

  return (
    <>
      <div>진행중1</div>
      <button onClick={handleSupplierSignWallet}>2. Supplier Sign Wallet</button>
    </>
  );
}

export default Stage2;