import React from 'react';
import smoothscroll from 'smoothscroll-polyfill';

import Home from './component/Home';
import About from './component/About';
import Ad from './component/Ad';
import BusinessPartner from './component/BusinessPartner';
import Us from './component/Us';

import { Col, Row, Container, Button } from 'react-bootstrap';
import { IoIosArrowDropupCircle } from "react-icons/io";

import './Main.css';

smoothscroll.polyfill();

const Main = ( userData ) => {
  const topClick = () => {
    window.scrollTo(0, 0, { behavior : "smooth" })
  }
  const onHomeClick = () => {
    window.scrollTo(0, 0, { behavior : "smooth" })
      };
  const onAboutClick = () => {
    window.scrollTo(0, 905, { behavior : "smooth" })
      };
  const onAdClick = () => {
    window.scrollTo(0, 2250, { behavior : "smooth" })
      };
  const onCreatorClick = () => {
    window.scrollTo(0, 4000, { behavior : "smooth" })
      };

  return (
    <Container className='main_container'>
      <header className='header'>
        <Row >
          <Col xs={3}><Button variant="link" onClick={onHomeClick}><h5>Home</h5></Button></Col>
          <Col xs={3}><Button variant="link" onClick={onAboutClick}><h5>About</h5></Button></Col>
          <Col xs={2}><Button variant="link" onClick={onAdClick}><h5>Ads</h5></Button></Col>
          <Col xs={1} ><Button variant="link" onClick={onCreatorClick}><h5>Partner</h5></Button></Col>
        </Row>
      </header>
      <main className='body_container'>
        <Home />
        <About />
        <Ad />
        <BusinessPartner />
        <Us />
      </main>
      <Button variant="light" className='upbutton' onClick={topClick}>
        <IoIosArrowDropupCircle />
      </Button>
    </Container>
  );
}

export default Main;