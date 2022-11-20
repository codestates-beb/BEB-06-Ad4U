import React from 'react';
import './Ad.css';
import { Row, Col, Card, Button } from 'react-bootstrap';
import img from '../../dummyfiles/img3.png'
import { Link } from 'react-router-dom';

const Ad = () => {

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
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </div>
         
      </div>
      <div className='viewall'>
      {/* div,a 태그도 고려 */}
        <Link to="/list"><button className='viewall_btn'><span>View all</span></button></Link>
       </div>
    </div>
  );
}

export default Ad;