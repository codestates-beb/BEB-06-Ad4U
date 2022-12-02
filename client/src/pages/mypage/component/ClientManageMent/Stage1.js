import React from 'react';

import { Container, Col } from 'react-bootstrap';

import '../../Client.css';

//협의중
const Stage1 = ({ adList }) => {
  const { channelName } = adList.Advertisement_has_Suppliers[0].Supplier;

  return (
    <>
      <Container className='clientManagement_container'>
        {channelName
          ? <Col className='clientStage1_contentArea'><div>{channelName} 님의 컨트랙트 서명을 기다리고 있습니다.</div></Col>
          : <Col className='clientStage1_contentArea'><div>크리에이터의 컨트랙트 서명을 기다리고 있습니다.</div></Col>}
      </Container>
    </>
  );
}

export default Stage1;