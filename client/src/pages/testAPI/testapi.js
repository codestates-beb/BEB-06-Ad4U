import React from 'react';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Button } from 'react-bootstrap';
import method from '../../hooks/web3/sendTransaction'


const TestApiPage = () => {


// 1. Multi-Sig Wallet Deploy
  const handleDeploy = async () => {
    const supplierAddr = "0xebF43eF8B387652A862DaFE5990f264336C58DB5";
    const result = await method.multiSigWalletDeploy(supplierAddr);
    console.log(result)
  };

// 2. Supplier Sign Wallet
  const handleSupplierSignWallet = async () => {
    let walletAddress = "0x6B22a196da91253c4a975E5217BB5dA0a1469e81";
    const result = await method.supplierSignWallet(walletAddress);
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
    <Container>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Client</h1>
        <br></br>
      <Row>
        <Col xs={2}>
            <Button onClick={handleDeploy}>1. Multi-Sig Wallet Deploy</Button>
        </Col>
        <Col xs={2}>
            <Button onClick={handleSubmitTransaction}>3. Submit Transaction</Button>
        </Col>
        <Col xs={2}>
            <Button onClick={handleConfirmTransaction}>4. Confirm Transaction</Button>
        </Col>
        <Col xs={2}>
            <Button onClick={handleRevokeConfirmation}>5. Revoke Transaction</Button>
        </Col>
        <Col xs={2}>
            <Button onClick={handleExecuteTransaction}>6. Excute Transaction</Button>
        </Col>
        <Col xs={2}>
            
        </Col>
      </Row>
      <br></br>
        <h1>Supplier</h1>
      <br></br>
      <Row>
        <Col xs={2}>
            <Button onClick={handleSupplierSignWallet}>2. Supplier Sign Wallet</Button>
        </Col>
        <Col xs={2}>
            
        </Col>
        <Col xs={2}>
            <Button onClick={handleConfirmTransaction}>4. Confirm Transaction</Button>
        </Col>
        <Col xs={2}>
            <Button onClick={handleRevokeConfirmation}>5. Revoke Transaction</Button>
        </Col>
        <Col xs={2}>
            
        </Col>
        <Col xs={2}>
            
        </Col>
      </Row>
    </Container>
  );
}
export default TestApiPage;