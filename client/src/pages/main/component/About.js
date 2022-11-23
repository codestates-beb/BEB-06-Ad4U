import React from 'react';
import '../Main.css';
const ReactRotatingText = require("react-rotating-text");

const About = () => {
  return (
    <div className='about_container'>
      <div className='typist my-2'>
        <h1>What is AD4U? </h1>
        <h2>Vision</h2>
        <h2>기업과 크리에이터를 이어주는 신뢰있는 계약 중개 플랫폼 </h2>
        <h2>
          You can <br/>
          <ReactRotatingText 
            items={['save brokerage fees.', 'make your imagination a reality.', 'make a trusted contract.','etc.']}
            color = "rgb(108,182,154)"
          />
        </h2>
      </div>
    </div>
  );
}

export default About;