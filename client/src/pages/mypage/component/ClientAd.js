import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Accordion, Col, Row, Container} from 'react-bootstrap';
import '../Client.css';

const ClientAd = ({ adList }) => {
  console.log(adList)
  return (
    <>
      <Accordion defaultActiveKey={['0']}>
      <Accordion.Item>
      <Accordion.Header>광고 #1</Accordion.Header>
      <Accordion.Body>
      </Accordion.Body>
      </Accordion.Item>
      </Accordion>
    </>
  );
}

export default ClientAd;