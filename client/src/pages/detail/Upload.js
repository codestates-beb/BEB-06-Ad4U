import React from 'react';

import Profile from '../mypage/component/Profile';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import AdUpload from './component/AdUpload'

const UploadPage = ({ userData }) => {

  return (
    <Container>
      <Row xs={2}>
        <Col xs={2}>
          <Profile />
        </Col>
        <Col xs={10}>
          <AdUpload/>
        </Col>          
      </Row>
    </Container>
  );
}

export default UploadPage;
