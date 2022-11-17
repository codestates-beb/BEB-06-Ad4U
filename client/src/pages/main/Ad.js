import React from 'react';
import './Ad.css';
import { Row, Col, Card, Button } from 'react-bootstrap';
import img from '../../dummyfiles/img3.png'
import axios from 'axios';

const Ad = () => {

  const fetchData = async () => {
    const data = await axios.get("https://www.googleapis.com/youtube/v3/channels")
  }

  return (
    <div className='ad_container'>
      <div className='ad_title'>ADBERTISMENT</div>
        <div className="ad-content">
          <div className="ad-content_card-container">
            <Card.Img variant="top" src={img}/>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </div>

          <div className="ad-content_card-container">
            <Card.Img variant="top" src={img}/>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </div>
          <div className="ad-content_card-container">
            <Card.Img variant="top" src={img}/>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of      the card's content.
              </Card.Text>
            </Card.Body>
          </div>
          <Button href="/list">View all</Button>
    </div>
</div>
  );
}

export default Ad;