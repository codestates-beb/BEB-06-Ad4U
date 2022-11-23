import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Accordion, Col, Row, Container } from 'react-bootstrap';
import '../../Client.css';

const Stage1 = ({ adList }) => {

  return (
    <>
      <div>협의중</div>
      <Link to="/contract">계약서 작성</Link>
    </>
  );
}

export default Stage1;