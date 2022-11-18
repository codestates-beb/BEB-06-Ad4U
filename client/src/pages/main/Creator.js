import React from 'react';
import './Creator.css';
import { Row, Col, Card, Button, Stack } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

const Creator = () => {

  return (
<div className='creator_container'>
      <div className='creator_title'>CREATORS</div>
        <div className="creator-content">
          <div className="creator-content_card-container">
            <Row>
            <Col><Avatar size="100" round={true}/></Col>
            <Col><Card.Body>
              <Card.Title>creator name</Card.Title>
              <Card.Text>subscribers</Card.Text>
            </Card.Body></Col>
            </Row>
          </div>

          <div className="creator-content_card-container">
            <Row>
            <Col><Avatar size="100" round={true}/></Col>
            <Col><Card.Body>
              <Card.Title>creator name</Card.Title>
              <Card.Text>subscribers</Card.Text>
            </Card.Body></Col>
            </Row>
          </div>
          <div className="creator-content_card-container">
            <Row>
            <Col><Avatar size="100" round={true}/></Col>
            <Col><Card.Body>
              <Card.Title>creator name</Card.Title>
              <Card.Text>subscribers</Card.Text>
            </Card.Body></Col>
            </Row>
          </div>
    </div>
    <div className='viewall'>
      <Link to="/list"><button className='viewall_btn'><span>View all</span></button></Link>
    </div>
</div>

  );
}

export default Creator;