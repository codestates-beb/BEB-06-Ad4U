import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import './NFE.css';

const Loading = () => {
  return (
      <Container className='d-flex justify-content-center'>
        {/* <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> */}
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
          <span className="sr-only">잠시만 기려주세요!!</span>
        </Spinner>
      </Container>
  )
}

export default Loading;