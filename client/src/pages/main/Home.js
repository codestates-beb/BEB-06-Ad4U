import React from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import './Home.css';
import { motion } from 'framer-motion'

const Home = () => {

  return (
    <section className='home_cantainer'>
          <Row>
            <Col sn={{ size: 1, offset: 100}}>
              <div className='home_text1'>JOIN</div>
              <div className='home_text2'>We Create trustworthy contracts with Blockchain.</div>
            </Col>
          </Row>
    </section>
  );
}

export default Home;