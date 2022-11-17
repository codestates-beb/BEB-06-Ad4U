import React from 'react';
import './Creator.css';
import { Row, Col, Card, Button } from 'react-bootstrap';
import img from '../../dummyfiles/img3.png'
import Avatar from 'react-avatar';

const Creator = () => {
  return (
    <div className='creator_container'>
      <div className='creator_title'>CREATOR</div>
      <div className="creator-content">
        <div className="creator-content_card-container">
          <Row>
        <Col>
          <Avatar size="100"  round={true}/>
          <Card.Body>
            <Card.Title>channels name</Card.Title>
            <Card.Text>
              subscribers
            </Card.Text>
          </Card.Body>
          </Col>
          </Row>
        </div>
      </div>
      <Button href="/list/supplier">View all</Button>
    </div>
  );
}

export default Creator;