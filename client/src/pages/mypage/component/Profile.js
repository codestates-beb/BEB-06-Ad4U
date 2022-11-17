import React from 'react';

import altImg from '../../../dummyfiles/img1.png'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Avatar from 'react-avatar';

import './Profile.css';

const Profile = () => {
  return (
      <Container className='profile_container'>       
        <Row>
          <Avatar className='profile_img' src={altImg} round={true}/> 
          <div className='profile_name'>My name</div>
        </Row>
      </Container>
  );
}

export default Profile;
