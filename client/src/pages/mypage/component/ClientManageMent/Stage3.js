import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import { getLocalData } from '../../../../config/localStrage';
import contract from '../../../../hooks/axios/contract';
import method from '../../../../hooks/web3/sendTransaction';
import '../../Client.css';

//진행중2
const Stage3 = ({ adList }) => {
  const adId = adList.id;
  const contractAddress = adList.multisigAddress;
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

  let txIndex = 0;

  // 4. Confirm Transaction
  const handleConfirmTransaction = async () => {
    try {
      const tx = await method.confirmTransaction(contractAddress, txIndex);
      console.log(tx)
      if (tx) return alert("성공!");
    } catch (err) {
      console.log(err);
      alert("실패");
    }
  };

  //Confirm 두개가 됬을 경우, 서버로 결과를 보냄
  const sendResult = async () => {
    try {
      const result = await contract.complete(accessToken, isClient, adId);
      console.log(result)
      if (result) return alert("성공!");
    } catch(err) {
      console.log(err);
      alert("실패");
    }
  }

  // 5. Revoke Transaction
  const handleRevokeConfirmation = async () => {
    try {
      const tx = await method.revokeConfirmation(contractAddress, txIndex);
      console.log(tx);
      if (tx) return alert("성공!");
    } catch(err) {
      console.log(err);
      alert("실패");
    }
  };
  
  // 6. Excute Transaction
  const handleExecuteTransaction = async () => {
    try {
      const tx = await method.executeTransaction(contractAddress, txIndex);
      console.log(tx);
      if (tx) return alert("성공!");
    } catch(err) {
      console.log(err);
      alert("실패");
    }
  };

  return (
    <>
      <div>진행중2</div>
      <button onClick={handleConfirmTransaction}>4. Confirm Transaction</button>
      <button onClick={sendResult}>서버로 결과보내기</button>
      <div>파기하시겠습니까?</div>
      <button onClick={handleRevokeConfirmation}>5. Revoke Transaction</button>
      <button onClick={handleExecuteTransaction}>6. Excute Transaction</button>
    </>
  );
}

export default Stage3;