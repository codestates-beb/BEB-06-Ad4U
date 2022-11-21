import React from 'react';
import './Upload.css';

import Profile from '../common/Profile';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import AdUpload from './component/AdUpload'

const UploadPage = ({ userData }) => {

  return (
    <div className='upload_container'>
    <Container>
      <Row>
        <Col xl={3}>
          <Profile />
        </Col>
        <Col xl={9} >
          <AdUpload/>
        </Col>          
      </Row>
    </Container>
    </div>
  );
}

export default UploadPage;
