import React, { useEffect, useState } from 'react';
import Web3 from "web3";

import ad from '../../../hooks/axios/ad'
import {getTransactionCount, getTransaction} from '../../../hooks/web3/queryContract'
import total_back from '../imgs/totalvalue_back.png';

import { Container } from 'react-bootstrap';

import '../Main.css';

const TotalValue = () => {

  const [AllContract, setAllContract] = useState([]);
  const [totalContractVal, setTotalContractVal] = useState(0);

  async function getAllContract() {
    const result = await ad.allContractList();
    setAllContract(result.data);
  }

  const totalValSet = async () => {
    var totalVal = 0;
    AllContract.map(async (element) => {
        var walletAddress = element.multisigAddress; 
        var txCount = await getTransactionCount(walletAddress);
        for(let i=0;i<txCount;i++) {
            var txInfo = await getTransaction(walletAddress,i);
            var txVal = txInfo.value;
            totalVal += parseInt(txVal)
            const valToWei = Web3.utils.fromWei(String(totalVal), "ether");
            setTimeout(() => {

            },5000)
            setTotalContractVal(valToWei);
        }
    })
  }
    
  useEffect(() => {
    getAllContract();
  },[])

  useEffect(() => {
    totalValSet();
  },[AllContract])

  useEffect(() => {
  },[totalContractVal])

  return (
    <Container className='totalVal_container'>
      <img src={total_back} alt="total_back" className='total_back'/>
      <h1 className='totalTitle'>누적 거래량</h1>
      <h2>{totalContractVal} ETH</h2>
    </Container>
  );
}

export default TotalValue;