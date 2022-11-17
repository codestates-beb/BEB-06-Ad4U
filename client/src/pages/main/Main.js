import React from 'react';
import About from './About';
import Home from './Home';
import { Container, Button } from 'react-bootstrap';
import './Main.css';
import Ad from './Ad';
import Creator from './Creator';
import smoothscroll from 'smoothscroll-polyfill';
import { IoIosArrowDropupCircle } from "react-icons/io";

// scrollTo 메서드를 사용 할 때, behavior 속성을 smooth로 설정 할 경우, 스크롤 이동시 부드럽게 이동하는 효과 
smoothscroll.polyfill();

const Main = () => {
  const topClick = () => {
    window.scrollTo(0, 0, { behavior : "smooth" })
  }

  return (
  <Container className='main_container'>
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