import React from 'react';

import altImg from '../../dummyfiles/img1.png'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Image from 'react-bootstrap/Image'

import './Profile.css';

const Profile = () => {
  return (
      <Container className='profile_container'>        
        <Row>
          <Image 
            className='profile_img'
            src={altImg}
            alt="profile_Img"
            roundedCircle={true}
          />
          <div className='profile_name'>My name</div>
        </Row>
      </Container>
  );
}

export default Profile;
