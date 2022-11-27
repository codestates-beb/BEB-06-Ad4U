import React from 'react';
import './Detail.css';

import Profile from '../common/Profile';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import AdUpload from './component/AdUpload'
import { useNavigate } from 'react-router-dom';
import nullImg from '../../dummyfiles/img1.png';
import Avatar from 'react-avatar';

const UploadPage = ({ userData  }) => {
  const navigate = useNavigate();
  console.log(userData )
  return (
    <div className='upload_container'>
    <Container>
      <Row>
        <Col xl={3}>
          <Row>
            <div className="profile-content">
              <div className="profile-content_card-container">
                {userData.profileImgUrl 
                ? <Avatar src={userData.profileImgUrl} size="100" round={true}/>
                : <Avatar src={nullImg} size="100" round={true}/>}
                <Card.Body>
                  <Card.Title className='mt-3' 
                    onClick={() => navigate(`/detail/client/${userData.id}`)}
                    key={userData.id}>
                    {userData.company_name}
                  </Card.Title>
                  <ListGroup variant="flush" className='mt-3'>
                  <ListGroup.Item >{userData.email}</ListGroup.Item>
                  <ListGroup.Item >{userData.company_number}</ListGroup.Item>
                  <ListGroup.Item >{userData.userId}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </div>
            </div>
          </Row>
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
