import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../../hooks/web3/sendTransaction';
import contract from '../../../../hooks/axios/contract';
import { getLocalData } from '../../../../config/localStrage';
import '../../Supplier.css';
import Loading from '../../../../component/Loading';

const Stage1 = ({ adList }) => {
  const adId = adList.id;
  const contractAddress = adList.multisigAddress;
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

  const [isLoading, setIsLoading] = useState(false);

  // 2. Supplier Sign Wallet
  const handleSupplierSignWallet = async () => {
    try {
      setIsLoading(true);
      const tx = await method.supplierSignWallet(contractAddress);
      if (tx) return contract.proceed(accessToken, isClient, adId);
      setIsLoading(false)
    } catch (err) {
      console.log(err);
      alert("트랜젝션 생성에 실패하였습니다.");
    }
  };

  return (
    <>
      {isLoading 
        ? <Loading />
        : <>
            <div>협의중</div>
            <button onClick={handleSupplierSignWallet}>2. Supplier Sign Wallet</button>
          </> 
      }
    </>
  );
}

export default Stage1;