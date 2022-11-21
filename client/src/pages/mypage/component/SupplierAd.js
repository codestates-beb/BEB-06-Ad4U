import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import Stage_0 from './SupplierManageMent/Stage_0';
import Stage_1 from './SupplierManageMent/Stage_1';
import Stage_2 from './SupplierManageMent/Stage_2';
import Stage_3 from './SupplierManageMent/Stage_3';
import Stage_4 from './SupplierManageMent/Stage_4';
import '../Client.css';

const SupplierAd = ({ idx, adList }) => {
  const { title, status } = adList;

  const Rendering = () => {
    if(status === 0) return <Stage_0 adList={adList} />; 
    if(status === 1) return <Stage_1 adList={adList} />;
    if(status === 2) return <Stage_2 adList={adList} />;
    if(status === 3) return <Stage_3 adList={adList} />;
    if(status === 4) return <Stage_4 adList={adList} />;
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