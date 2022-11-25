import React, { useState } from 'react';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Button, Spinner } from 'react-bootstrap';
import method from '../../../hooks/web3/sendTransaction';

import '../Client.css';


const TestApiPage = () => {

  const [isLoading_deploy, setIsLoading_deploy] = useState(false);
  const [isLoading_submit, setIsLoading_submit] = useState(false);
  const [isLoading_confirm_client, setIsLoading_confirm_client] = useState(false);
  const [isLoading_revoke_client, setIsLoading_revoke_client] = useState(false);
  const [isLoading_excute, setIsLoading_excute] = useState(false);
  const [isLoading_supplierSignWallet, setIsLoading_supplierSignWallet] = useState(false);
  const [isLoading_confirm_supplier, setIsLoading_confirm_supplier] = useState(false);
  const [isLoading_revoke_supplier, setIsLoading_revoke_supplier] = useState(false);

// 1. Multi-Sig Wallet Deploy
  const handleDeploy = async () => {
    setIsLoading_deploy(true);
    const supplierAddr = "0xebF43eF8B387652A862DaFE5990f264336C58DB5";
    const result = await method.multiSigWalletDeploy(supplierAddr);
    console.log(result)
    setIsLoading_deploy(false);
  };

// 2. Supplier Sign Wallet
  const handleSupplierSignWallet = async () => {
    setIsLoading_supplierSignWallet(true);
    let walletAddress = "0x6B22a196da91253c4a975E5217BB5dA0a1469e81";
    const result = await method.supplierSignWallet(walletAddress);
    console.log(result)
    setIsLoading_supplierSignWallet(false);
  };

// 3. Submit Transaction
  const handleSubmitTransaction = async () => {
    setIsLoading_submit(true);
    let walletAddress = "0x6B22a196da91253c4a975E5217BB5dA0a1469e81";
    let to = "0xebF43eF8B387652A862DaFE5990f264336C58DB5";
    let value = "0.1";
    let data = "web3 revoke test"
    const result = await method.submitTransaction(walletAddress,to,value,data);
    console.log(result)
    setIsLoading_submit(false);
  };

// 4. Confirm Transaction Client
  const handleConfirmTransaction_client = async () => {
    setIsLoading_confirm_client(true);
    let walletAddress = "0x6B22a196da91253c4a975E5217BB5dA0a1469e81";
    let txIndex = 1;
    const result = await method.confirmTransaction(walletAddress,txIndex);
    console.log(result)
    setIsLoading_confirm_client(false);
  };

// 4. Confirm Transaction Supplier
  const handleConfirmTransaction_supplier = async () => {
    setIsLoading_confirm_supplier(true);
    let walletAddress = "0x6B22a196da91253c4a975E5217BB5dA0a1469e81";
    let txIndex = 1;
    const result = await method.confirmTransaction(walletAddress,txIndex);
    console.log(result)
    setIsLoading_confirm_supplier(false);
  };

// 5. Revoke Transaction Client
const handleRevokeConfirmation_client = async () => {
    setIsLoading_revoke_client(true);
    let walletAddress = "0x6B22a196da91253c4a975E5217BB5dA0a1469e81";
    let txIndex = 1;
    const result = await method.revokeConfirmation(walletAddress,txIndex);
    console.log(result)
    setIsLoading_revoke_client(false);
  };

// 5. Revoke Transaction Supplier
const handleRevokeConfirmation_supplier = async () => {
    setIsLoading_revoke_supplier(true);
    let walletAddress = "0x6B22a196da91253c4a975E5217BB5dA0a1469e81";
    let txIndex = 1;
    const result = await method.revokeConfirmation(walletAddress,txIndex);
    console.log(result)
    setIsLoading_revoke_supplier(false);
  };

// 6. Excute Transaction
  const handleExecuteTransaction = async () => {
    setIsLoading_excute(true);
    let walletAddress = "0x6B22a196da91253c4a975E5217BB5dA0a1469e81";
    let txIndex = 0;
    const result = await method.executeTransaction(walletAddress,txIndex);
    console.log(result)
    setIsLoading_excute(false);
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
          {isLoading_deploy 
            ? <Spinner animation="border" variant="success"/> 
            : <button className='testapi_btn' onClick={handleDeploy}><span>1. Multi-Sig Wallet Deploy</span></button>}
        </Col>
        <Col xs={2}>
          {isLoading_submit 
            ? <Spinner animation="border" variant="success"/> 
            : <button className='testapi_btn' onClick={handleSubmitTransaction}><span>3. Submit Transaction</span></button>}
        </Col>
        <Col xs={2}>
          {isLoading_confirm_client 
            ? <Spinner animation="border" variant="success"/> 
            : <button className='testapi_btn' onClick={handleConfirmTransaction_client}><span>4. Confirm Transaction</span></button>}
        </Col>
        <Col xs={2}>
          {isLoading_revoke_client 
            ? <Spinner animation="border" variant="success"/> 
            : <button className='testapi_btn' onClick={handleRevokeConfirmation_client}><span>5. Revoke Transaction</span></button>}
        </Col>
        <Col xs={2}>
          {isLoading_excute 
            ? <Spinner animation="border" variant="success"/> 
            : <button className='testapi_btn' onClick={handleExecuteTransaction}><span>6. Excute Transaction</span></button>}
        </Col>
        <Col xs={2}>
            
        </Col>
      </Row>
      <br></br>
        <h1>Supplier</h1>
      <br></br>
      <Row>
        <Col xs={2}>
          {isLoading_supplierSignWallet 
            ? <Spinner animation="border" variant="success"/> 
            : <button className='testapi_btn' onClick={handleSupplierSignWallet}><span>2. Supplier Sign Wallet</span></button>}
        </Col>
        <Col xs={2}>
            
        </Col>
        <Col xs={2}>
          {isLoading_confirm_supplier 
            ? <Spinner animation="border" variant="success"/> 
            : <button className='testapi_btn' onClick={handleConfirmTransaction_supplier}><span>4. Confirm Transaction</span></button>}
        </Col>
        <Col xs={2}>
          {isLoading_revoke_supplier 
            ? <Spinner animation="border" variant="success"/> 
            : <button className='testapi_btn' onClick={handleRevokeConfirmation_supplier}><span>5. Revoke Transaction</span></button>}
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