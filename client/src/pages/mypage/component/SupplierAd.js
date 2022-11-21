import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import method from '../../../hooks/web3/sendTransaction';
import '../Client.css';

const SupplierAd = ({ idx, adList }) => {
  console.log(idx, adList)

  const RenderButton = ({ adList }) => {
    console.log(adList.status)
  }

  return (
    <>
      <Accordion defaultActiveKey={['0']}>
        <Accordion.Item>
        <Accordion.Header>광고 #1</Accordion.Header>
        <Accordion.Body>
          <RenderButton adList={adList} />
        </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default SupplierAd;