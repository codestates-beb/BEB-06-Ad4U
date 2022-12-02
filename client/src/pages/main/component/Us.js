import React from 'react';

import us_img from '../imgs/back_Us.png';
import team4u_img from '../../../dummyfiles/img1.png';

import { Col, Row, Card } from 'react-bootstrap';
import { BsGithub } from "react-icons/bs";

import '../Main.css';

const Us = () => {
  const handle1Click = (e) => {
    window.location.href = 'https://github.com/apfl99/BEB-06-Ad4U.git';
  }
  const handle2Click = (e) => {
    window.location.href = 'https://github.com/Ellie-kang/BEB-06-Ad4U.git';
  }
  const handle3Click = (e) => {
    window.location.href = 'https://github.com/HCW-code/BEB-06-Ad4U.git';
  }
  const handle4Click = (e) => {
    window.location.href = 'https://github.com/yiminwook/BEB-06-Ad4U.git';
  }

  return (
    <div className='Us_cantainer'>
      <div className='Team4U_title'>Team4U</div>
      <Row className='us_card_container'>
        <Col><div className="us_card">
          <Card.Body>
            <Card.Title>김현우</Card.Title>
            <Card.Text>팀장</Card.Text>
            <Card.Text>Backend, Smart Contract</Card.Text>
            <BsGithub size="24" color='white' onClick={handle1Click} />
          </Card.Body>
        </div></Col>
        <Col><div className="us_card">
          <Card.Body>
            <Card.Title>홍찬우</Card.Title>
            <Card.Text>팀원</Card.Text>
            <Card.Text>Backend, Smart Contract</Card.Text>
            <BsGithub size="24" color='white' onClick={handle3Click} />
          </Card.Body>
       
        </div></Col>
        <Col><div className="us_card">
          <Card.Body>
            <Card.Title>이민욱</Card.Title>
            <Card.Text>팀원</Card.Text>
            <Card.Text>Frontend</Card.Text>
            <BsGithub size="24" color='white' onClick={handle4Click} />
          </Card.Body>
        </div></Col>
        <Col><div className="us_card">
          <Card.Body>
            <Card.Title>강영아</Card.Title>
            <Card.Text>팀원</Card.Text>
            <Card.Text>Frontend</Card.Text>
            <BsGithub size="24" color='white' onClick={handle2Click} />
          </Card.Body>
        </div></Col>
      </Row>
    </div>
  );
}

export default Us;