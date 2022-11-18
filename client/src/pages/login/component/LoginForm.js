import React, { useRef } from 'react';

import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import '../Loginpage.css';

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
      <Form onSubmit={onSubmit}>
        <Form.Group 
          className="login_inputArea"
          as={Col} 
          xs={{ span: 7, offset: 2 }}
        >
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="id"
            // placeholder="ID"
            autoFocus
            ref={idRef}
          />
        </Form.Group>
        <Form.Group
          className="login_inputArea"
          as={Col} 
          xs={{ span: 7, offset: 2 }}
        >
          <Form.Label>Password</Form.Label>
          <Form.Control 
           type="password"
          //  placeholder="Password"
           ref={passwordRef}
          />
        </Form.Group>
          <Col               
            className="login_button" 
            as={Col} 
            xs={{ span: 2, offset: 5 }} 
          >
            <Button variant="primary" type='submit'>
              LogIn
            </Button>
          </Col>
      </Form>
    </>
  )
}

export default LoginForm;