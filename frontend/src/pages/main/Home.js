import React from 'react';
import { Col, Row } from 'react-bootstrap';



const Home = () => {
  return (
    <section className='first'>
      <div className='first_background'>
        <div className='first_container'>
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