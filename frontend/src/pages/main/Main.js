import React, { useEffect, useRef } from 'react';
import About from './About';
import Home from './Home';
import { motion } from 'framer-motion'
import { Container, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Main.css';
import Ad from './Ad';
import Creator from './Creator';
import smoothscroll from 'smoothscroll-polyfill';
import { IoIosArrowDropupCircle } from "react-icons/io";

// scrollTo 메서드를 사용 할 때, behavior 속성을 smooth로 설정 할 경우, 스크롤 이동시 부드럽게 이동하는 효과 
smoothscroll.polyfill();

const Main = () => {
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   const menuHeight = document.querySelector(".menubar_cantainer").offsetHeight;
  //   const location = document.querySelector("#ad").offsetTop;
  //   window.scrollTo({ top: location - menuHeight, behavior:'smooth'});
  // }
  // const homeRef = useRef(null);
  // const aboutRef = useRef(null);
  // const adRef = useRef(null);
  // const creatorRef = useRef(null);

  const onHomeClick = () => {
    window.scrollTo(0, 100, { behavior : "smooth" })
      };
  const onAboutClick = () => {
    window.scrollTo(0, 1000, { behavior : "smooth" })
      };
  const onAdClick = () => {
    window.scrollTo(0, 2000, { behavior : "smooth" })
      };
  const onCreatorClick = () => {
    window.scrollTo(0, 3000, { behavior : "smooth" })
      };
  const topClick = () => {
    window.scrollTo(0, 0, { behavior : "smooth" })
  }

  return (
  <Container className='main_container'>
    <motion.div className='menubar' initial="hidden" animate="show">
        <Row>
          <Col><motion.p variants={item}><Button variant="link" onClick={onHomeClick}>Home</Button></motion.p></Col>
          <Col><motion.p variants={item}><Button variant="link" onClick={onAboutClick}>About</Button></motion.p></Col>
          <Col><motion.p variants={item}><Button variant="link" onClick={onAdClick}>Advertisement</Button></motion.p></Col>
          <Col><motion.p variants={item}><Button variant="link" onClick={onCreatorClick}>Creator</Button></motion.p></Col>
        </Row>
    </motion.div>
    <Home />
    <About />
    <Ad />
    <Creator />
    <Button variant="light" className='upbutton' onClick={topClick}>
      <IoIosArrowDropupCircle />
    </Button>
  </Container>
  );
}

export default Main;