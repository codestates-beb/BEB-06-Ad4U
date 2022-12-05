import React from 'react';

import back from '../imgs/home_back.png';

import { Col, Row, Container } from 'react-bootstrap';

import '../Main.css';

const Home = () => {

  return (
    <Container className='home_cantainer'>
      <Row>
        <Col xl={5} xs={7} className='text' >
          <div className='home_text1'>JOIN</div>
          <div className='home_text2'>We Create trustworthy contracts <br/> with Blockchain.</div>
        </Col>
        <Col  xl={7} xs={5} className='img'>
          <img src={back} alt={back} />
        </Col>
      </Row>
    </Container>
  );
}

export default Home;