import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import '../../Client.css';

import {AdContract} from '../Contract';

//협의중
const Stage1 = ({ adList }) => {
  const adId = adList.id;

  return (
    <>
      <div>협의중</div>
      <Link to={`/mypage/client/contract/${adId}`}>계약서 작성하러가기</Link>
    </>
  );
}

export default Stage1;