import React from 'react';
import '../Main.css';
import { SiHiveBlockchain } from "react-icons/si";
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
        <div>
          <SiHiveBlockchain size="24" color='white' onClick={handle1Click} />
          <SiHiveBlockchain size="24" color='white' onClick={handle2Click} />
          <SiHiveBlockchain size="24" color='white' onClick={handle3Click} />
          <SiHiveBlockchain size="24" color='white' onClick={handle4Click} />
        </div>
        
      </div>
    </div>
  );
}

export default About;