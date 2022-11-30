import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Col, Row,  } from 'react-bootstrap';
import '../../Client.css';

//협의중
const Stage1 = ({ adList }) => {
  const adId = adList.id;

  const { id, channelName, profileImgUrl, channelUrl } = adList.Advertisement_has_Suppliers[0].Supplier;

  return (
    <>
      <Container className='clientManagement_container'>
        {channelName
        ? <Col className='clientStage1_contentArea'><div>크리에이터 ({channelName} 님)의 컨트랙트 서명을 기다리고 있습니다.</div></Col>
        : <Col className='clientStage1_contentArea'><div>크리에이터의 컨트랙트 서명을 기다리고 있습니다.</div></Col>}
      </Container>
    </>
  );
}

export default Stage1;