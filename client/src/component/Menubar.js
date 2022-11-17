import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

const menubar = () => {
  const onHomeClick = () => {
    window.scrollTo(0, 100, { behavior : "smooth" })
      };
  const onAboutClick = () => {
    window.scrollTo(0, 1000, { behavior : "smooth" })
      };
  const onAdClick = () => {
    window.scrollTo(0, 2000, { behavior : "smooth" })
      };
  const onCreatorClick = () => {
    window.scrollTo(0, 3000, { behavior : "smooth" })
      };

  return (
    <div className='menubar'>
    <Row className="justify-content-md-center" >
      <Col xs lg="2"><Button variant="link" onClick={onHomeClick}>Home</Button></Col>
      <Col xs lg="2"><Button variant="link" onClick={onAboutClick}>About</Button></Col>
      <Col xs lg="2"><Button variant="link" onClick={onAdClick}>Ad</Button></Col>
      <Col xs lg="2"><Button variant="link" onClick={onCreatorClick}>Creator</Button></Col>
    </Row>
    </div>
  );
}

export default menubar;