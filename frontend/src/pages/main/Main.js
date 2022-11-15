import React from 'react';
import Us from './Us';
import Home from './Home';
import { motion } from 'framer-motion'
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Main.css';

const Main = () => {
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  return (
  <Container className='main_container'>
    <Row>
      <Col><motion.p variants={item}><a href='#home'>Home</a></motion.p></Col>
      <Col><motion.p variants={item}><a href='#us'>Us</a></motion.p></Col>
      <Col><motion.p variants={item}><a href='#ad'>Advertisement</a></motion.p></Col>
      <Col><motion.p variants={item}><a href='#creator'>Creator</a></motion.p></Col>
    </Row>
    <Home />
    <Us />
  </Container>
  );
}

export default Main;