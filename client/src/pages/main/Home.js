import React from 'react';
import { Col, Row } from 'react-bootstrap';
import './Home.css';



const Home = () => {
  return (
    <section className='home_cantainer'>
      <div className='home_background'>
        <div className='home_container'>
          <Row>
            <Col sn={{ size: 1, offset: 100}}>
              <h1>Hi<br/>
              We Create trustworthy contracts with Blockchain.
              </h1>
              
            </Col>
            
          </Row>
          
        </div>
      </div>
    </section>

  );
}

export default Home;