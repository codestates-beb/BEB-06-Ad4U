import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import Stage0 from './ClientManageMent/Stage0';
import Stage1 from './ClientManageMent/Stage1';
import Stage2 from './ClientManageMent/Stage2';
import Stage3 from './ClientManageMent/Stage3';
import Stage4 from './ClientManageMent/Stage4';
import Stage5 from './ClientManageMent/Stage5';
import '../Client.css';

const ClientAd = ({ idx, adList, setIsLoading }) => {
  const { id, title, status } = adList;
 
  const Rendering = () => {
    if (adList && status === 0) return <Stage0 adList={adList} setIsLoading={setIsLoading} />; 
    if (adList && status === 1) return <Stage1 adList={adList} setIsLoading={setIsLoading} />;
    if (adList && status === 2) return <Stage2 adList={adList} setIsLoading={setIsLoading} />;
    if (adList && status === 3) return <Stage3 adList={adList} setIsLoading={setIsLoading} />;
    if (adList && status === 4) return <Stage4 adList={adList} setIsLoading={setIsLoading} />;
    if (adList && status === 5) return <Stage5 adList={adList} setIsLoading={setIsLoading} />;
    else return <div></div>;
  }

  const showStatus = (status) => {
    if (status === 0) return "모집중"; 
    if (status === 1) return "협의중";
    if (status === 2) return "진행중(1/2)";
    if (status === 3) return "진행중(2/2)";
    if (status === 4) return "완료";
    if (status === 5) return "파기";
    else return "";
  }

  return (
    <>
      <Accordion defaultActiveKey={['0']}>
        <Accordion.Item>
          <Accordion.Header>
            <Col xs={9}><span>{idx+1}. </span><span> {title}</span></Col>
            <Col xs={2}>{showStatus(status)}</Col>
          </Accordion.Header>
          <Accordion.Body>
            <Rendering />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default ClientAd;