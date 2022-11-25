import React from 'react';
import '../Main.css';
import { SiHiveBlockchain } from "react-icons/si";
import handshake from '../handshake_about.png';
import { Card, Col, Container, Row } from 'react-bootstrap';
const ReactRotatingText = require("react-rotating-text");


const About = () => {
  function handle1Click (e) {
    window.location.href = 'https://github.com/apfl99/BEB-06-Ad4U.git';
  }
  function handle2Click (e) {
    window.location.href = 'git@github.com:Ellie-kang/BEB-06-Ad4U.git';
  }
  function handle3Click (e) {
    window.location.href = 'https://github.com/HCW-code/BEB-06-Ad4U.git';
  }
  function handle4Click (e) {
    window.location.href = 'https://github.com/yiminwook/BEB-06-Ad4U.git';
  }
  return (
    <Container className='about_container'>
      <div className='typist my-2'>
        <h1>What is AD4U? </h1>
        <Row>
          <Col xl={3}><img src={handshake} alt='handshake'/></Col>
          <Col xl={9}><h2>기업과 크리에이터를 이어주는 신뢰있는 계약 중개 플랫폼 </h2></Col>
        </Row>
        <h1>Value</h1>
        <Row>
          <Col>
            <Card>
              <Card.Title>신뢰</Card.Title>
              <Card.Text>블록체인으로 중개자 없이도 신뢰도 있는 계약을 진행할 수 있습니다.</Card.Text>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Title>수수료 절감</Card.Title>
              <Card.Text>중개수수료가 없기 때문에, 온전한 광고료를 지급받을 수 있습니다.</Card.Text>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Title>커뮤니케이션</Card.Title>
              <Card.Text>활발한 커뮤니케이션을 할 수 있습니다.</Card.Text>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Title>활동</Card.Title>
              <Card.Text>활발한 광고 활동을 할 수 있습니다.</Card.Text>
            </Card>
          </Col>
        
        </Row>
        <Row>
          <Col xl={1}><h3>by</h3></Col>
          <Col xl={11}>
            <SiHiveBlockchain size="24" color='white' onClick={handle1Click} />
            <SiHiveBlockchain size="24" color='white' onClick={handle2Click} />
            <SiHiveBlockchain size="24" color='white' onClick={handle3Click} />
            <SiHiveBlockchain size="24" color='white' onClick={handle4Click} />
          </Col>
        </Row>
      </div>
        {/* <h3>
          You can <br/>
          <ReactRotatingText 
            items={['save brokerage fees.', 'make your imagination a reality.', 'make a trusted contract.','etc.']}
            color = "rgb(108,182,154)"
          />
        </h3> */}
    </Container>
  );
}



export default About;