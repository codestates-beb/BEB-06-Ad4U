import React, { useRef } from 'react';

import { Container, Row, Col, Form } from 'react-bootstrap';
import '../LoginPage.css';

const LoginForm = ({ sendLoginData }) => {

  let idRef = useRef(null);
  let passwordRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault(); //버튼을 눌러도 새로고침 되지않도록 함
    const userId = idRef.current.value;
    const password = passwordRef.current.value;
    const loginData = { userId, password } ;
    sendLoginData(loginData);
  }

  return(
    <>
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group 
            className="login_inputArea"
            as={Col} 
          >
            <br />
            <br />
            <Form.Label className='login_text'>아이디</Form.Label>
            <Form.Control
              type="id"
              autoFocus
              ref={idRef}
            />
          </Form.Group>
          <Form.Group
            className="login_inputArea"
            as={Col} 
          >
            <Form.Label className='login_text'>비밀번호</Form.Label>
            <Form.Control 
             type="password"
             ref={passwordRef}
            />
          </Form.Group>
          <br />
            <Row>
              <Col xl={4}/>
              <Col className='login_buttonArea' xl={4}>
                <button className="login_button"  type='submit'>
                  LogIn
                </button>
              </Col>
              <Col xl={4}/>
            </Row>
        </Form>
      </Container>  
    </>
  )
}

export default LoginForm;