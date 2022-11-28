import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import back from '../imgs/main_img.png';

import '../Main.css';

const Home = () => {

  return (
    <Container className='home_cantainer'>
        <Row>
          <Col xl={5} className='text' >
            <div className='home_text1'>JOIN</div>
            <div className='home_text2'>We Create trustworthy contracts <br/> with Blockchain.</div>
          </Col>
          <Col  xl={7} className='img'>
            <img src={back} alt={back} />
          </Col>
        </Row>
    </Container>
  );
}

export default Home;