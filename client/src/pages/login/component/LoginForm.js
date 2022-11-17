import React, { useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
      <Form.Group className="mb-3">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="id"
            // placeholder="ID"
            autoFocus
            ref={idRef}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control 
           rows={1} 
           type="password"
          //  placeholder="Password"
           ref={passwordRef}
          />
        </Form.Group>
        <Button variant="primary" type='submit'>
          LogIn
        </Button>
      </Form>
    </>
  )
}

export default LoginForm;