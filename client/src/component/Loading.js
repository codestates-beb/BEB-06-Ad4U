import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import './NFE.css';

const Loading = () => {
  return (
    <div className='loading_background'>
      <div className='loading_text'>잠시만 기다려 주세요</div>
      <br/>
      <Spinner animation="border" variant="primary" />  
    </div>
  )
}

export default Loading;