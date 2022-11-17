import React, { useState, useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignupForm = ({ email, sendSignupData }) => {
  
  const [isCorrect, setIsClient] = useState(true);

  let idRef = useRef(null);
  let passwordRef = useRef(null);
  let confirmRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault(); //버튼을 눌러도 새로고침 되지않도록 함
    const id = idRef.current.value;
    const password = passwordRef.current.value;
    const confirm = confirmRef.current.value;
    if (password === confirm) {
      const signupData = { email, id, password };
      setIsClient(true);
      sendSignupData(signupData);
    } else {
      setIsClient(false);
    }
  }

  return(
    <>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder="Google Email" 
            type="email"
            value={email}
            disabled
            autoFocus
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
        >
          <Form.Label>ID</Form.Label>
          <Form.Control 
            type="id" 
            rows={1} 
            ref={idRef}/>
        </Form.Group>
        <Form.Group
          className="mb-3"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password"
            rows={1} 
            ref={passwordRef}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type="password"
            rows={1} 
            ref={confirmRef}
          />
          <div>{isCorrect ? "" : "비밀번호가 일치하지 않습니다."}</div>
        </Form.Group>
        <Button variant="primary" type="submit">
          SignUp
        </Button>
      </Form>
    </>
  )
}

export default SignupForm;