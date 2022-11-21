import React from 'react';
import { Card, ListGroup, Container } from 'react-bootstrap';
import Avatar from 'react-avatar';

import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-content">
      <div className="profile-content_card-container">
        <Avatar size="100" round={true}/>
        <Card.Body>
          <Card.Title className='mt-3'>UserName</Card.Title>
          <ListGroup variant="flush" className='mt-3'>
            <ListGroup.Item >email</ListGroup.Item>
            <ListGroup.Item >data</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </div>
    </div>
  );
}

export default Profile;
