import React, { useEffect, useState } from 'react';
import '../Main.css';
import ad from '../../../hooks/axios/ad'
import {getTransactionCount, getTransaction} from '../../../hooks/web3/queryContract'

import Web3 from "web3";

const TotalValue = () => {

  const [AllContract, setAllContract] = useState([]);
  const [totalContractVal, setTotalContractVal] = useState(0);

  async function getAllContract() {
    const result = await ad.allContractList();
    // console.log(result.data);
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
            // console.log(txVal)
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
    // console.log(totalContractVal)
  },[totalContractVal])


  return (
    <div className='totalVal_container'>
        <h1 className='totalTitle'>누적 거래량</h1>
        <h2>{totalContractVal} ETH</h2>
    </div>
  );
}

export default TotalValue;