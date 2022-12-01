import React from 'react';

import TotalValue from './TotalValue';
import about_people from '../imgs/about_people.png';

import { Card, Col, Container, Row } from 'react-bootstrap';
import { SlPeople } from "react-icons/sl";
import { VscGistSecret } from "react-icons/vsc";
import { GrMoney } from "react-icons/gr";
import { GrDocumentUser } from "react-icons/gr";

import '../Main.css';

const About = () => {
  return (
    <Container className='about_container'>
      <h1>What is AD4U? </h1>
      <h2>365일 24시간 기업과 크리에이터를 이어주는 신뢰있는 광고 계약 중개 플랫폼입니다</h2>
      <div className='why'>Why AD4U?</div>
      <Row>
        <Col xl={6} xs={8}>
          <div className='about_card'>
            <Card>
              <Card.Text><VscGistSecret size="60" className='icon'/>블록체인 기술로 신뢰도 높은 계약을 진행할 수 있습니다.</Card.Text>
            </Card>
          </div>
          <div className='about_card'>
            <Card>
              <Card.Text><GrMoney size="60" className='icon'/>중개자가 존재하지 않기때문에, 중개 수수료를 필요로하지 않습니다.</Card.Text>
            </Card>
          </div>
          <div className='about_card'>
            <Card>
              <Card.Text><SlPeople size="60" className='icon'/>국내외 수많은 비즈니스 파트너들과 언제든지 만날 수 있습니다.</Card.Text>
            </Card>
          </div>
          <div className='about_card'>
            <Card>
              <Card.Text><GrDocumentUser size="60" className='icon'/>여러분의 모든 광고 활동을 기록하여 NFT로 보관할 수 있습니다.</Card.Text>
            </Card>
          </div>
        </Col>
        <Col xl={6} xs={4}>
          <img src={about_people} alt='about_people' className='about_people'/>
        </Col>
      </Row>
      <TotalValue/>
    </Container>
  );
}

export default About;