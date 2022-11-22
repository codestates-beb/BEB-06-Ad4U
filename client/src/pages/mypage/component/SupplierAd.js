import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import Stage0 from './SupplierManageMent/Stage0';
import Stage1 from './SupplierManageMent/Stage1';
import Stage2 from './SupplierManageMent/Stage2';
import Stage3 from './SupplierManageMent/Stage3';
import Stage4 from './SupplierManageMent/Stage4';
import '../Client.css';

const SupplierAd = ({ idx, adList }) => {
  const { title, status } = adList;

  const Rendering = () => {
    if(status === 0) return <Stage0 adList={adList} />; 
    if(status === 1) return <Stage1 adList={adList} />;
    if(status === 2) return <Stage2 adList={adList} />;
    if(status === 3) return <Stage3 adList={adList} />;
    if(status === 4) return <Stage4 adList={adList} />;
    else return <div></div>;
  }

  return (
    <>
      <Accordion defaultActiveKey={['0']}>
        <Accordion.Item>
          <Accordion.Header>{idx+1}.{title} STATUS-{status}</Accordion.Header>
          <Accordion.Body>
            <Rendering />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default SupplierAd;