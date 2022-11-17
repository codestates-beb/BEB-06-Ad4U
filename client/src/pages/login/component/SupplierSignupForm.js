import React, { useState, useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SupplierSignupForm = ({ email, sendSignupData }) => {
  
  const [isCorrect, setIsClient] = useState(true);

  let idRef = useRef(null);
  let passwordRef = useRef(null);
  let confirmRef = useRef(null);
  let addressRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault(); //버튼을 눌러도 새로고침 되지않도록 함
    const userId = idRef.current.value;
    const password = passwordRef.current.value;
    const confirm = confirmRef.current.value;
    const address = addressRef.current.value;

    if (password === confirm) {
      const signupData = { email, userId, password, address };
      
      if ( email && userId && password, address ) {
        setIsClient(true);
        sendSignupData(signupData);
      } else {
        alert("입력되지않은 정보가 있습니다.")
      }
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
        <Form.Group
          className="mb-3"
        >
          <Form.Label>WalletAddress</Form.Label>
          <Form.Control 
            type="id"
            rows={1} 
            ref={addressRef}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          SignUp
        </Button>
      </Form>
    </>
  )
}

export default SupplierSignupForm ;