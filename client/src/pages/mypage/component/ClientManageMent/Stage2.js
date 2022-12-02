import React from 'react';
import { Link } from 'react-router-dom';

import { BsArrowReturnRight } from 'react-icons/bs';
import { Col, Container } from 'react-bootstrap';

import '../../Client.css';

//진행중1
const Stage2 = ({ adList }) => {
  const adId = adList.id;
  
  return (
    <>
      <Container className='clientManagement_container'>
        <Col className='clientStage2_contentArea'>
          <div><BsArrowReturnRight />{' '}<Link to={`/mypage/client/contract/${adId}`}>계약서 작성하러가기</Link></div>
        </Col>
      </Container>
    </>
  );
}

export default Stage2;