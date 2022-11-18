import React from 'react';
import About from './About';
import Home from './Home';
import { Col, Row, Container, Button } from 'react-bootstrap';

import Ad from './Ad';
import Creator from './Creator';
import smoothscroll from 'smoothscroll-polyfill';
import { IoIosArrowDropupCircle } from "react-icons/io";

import './Main.css';

// scrollTo 메서드를 사용 할 때, behavior 속성을 smooth로 설정 할 경우, 스크롤 이동시 부드럽게 이동하는 효과 
smoothscroll.polyfill();

const Main = () => {
  const topClick = () => {
    window.scrollTo(0, 0, { behavior : "smooth" })
  }
  const onHomeClick = () => {
    window.scrollTo(0, 0, { behavior : "smooth" })
      };
  const onAboutClick = () => {
    window.scrollTo(0, 700, { behavior : "smooth" })
      };
  const onAdClick = () => {
    window.scrollTo(0, 1500, { behavior : "smooth" })
      };
  const onCreatorClick = () => {
    window.scrollTo(0, 2300, { behavior : "smooth" })
      };

  return (
    <Container className='main_container'>
      <header className='header'>
        <Row >
          <Col xs={3}><Button variant="link" onClick={onHomeClick}><h3>Home</h3></Button></Col>
          <Col xs={3}><Button variant="link" onClick={onAboutClick}><h3>About</h3></Button></Col>
          <Col xs={2}><Button variant="link" onClick={onAdClick}><h3>Ads</h3></Button></Col>
          <Col xs={1} ><Button variant="link" onClick={onCreatorClick}><h3>Creator</h3></Button></Col>
        </Row>
      </header>
      <main>
        <Home />
        <About />
        <Ad />
        <Creator />
      </main>
      <Button variant="light" className='upbutton' onClick={topClick}>
        <IoIosArrowDropupCircle />
      </Button>
    </Container>
  );
}

export default Main;