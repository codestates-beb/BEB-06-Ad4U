import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import '../../Supplier.css';

const Stage_2 = ({ adList }) => {

  // 4. Confirm Transaction
  const handleConfirmTransaction = async () => {
    let walletAddress = "0x6B22a196da91253c4a975E5217BB5dA0a1469e81";
    let txIndex = 1;
    const result = await method.confirmTransaction(walletAddress,txIndex);
    console.log(result)
  };

  // 5. Revoke Transaction
  const handleRevokeConfirmation = async () => {
    let walletAddress = "0x6B22a196da91253c4a975E5217BB5dA0a1469e81";
    let txIndex = 1;
    const result = await method.revokeConfirmation(walletAddress,txIndex);
    console.log(result)
  };
  
  // 6. Excute Transaction
  const handleExecuteTransaction = async () => {
    let walletAddress = "0x6B22a196da91253c4a975E5217BB5dA0a1469e81";
    let txIndex = 0;
    const result = await method.executeTransaction(walletAddress,txIndex);
    console.log(result)
  };

  return (
    <>
      <div>진행중</div>
      <button onClick={handleConfirmTransaction}>4. Confirm Transaction</button>

      <div>파기하시겠습니까?</div>
      <button onClick={handleRevokeConfirmation}>5. Revoke Transaction</button>
      <button onClick={handleExecuteTransaction}>6. Excute Transaction</button>
    </>
  );
}

export default Stage_2;