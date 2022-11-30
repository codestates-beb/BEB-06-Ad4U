import React, { useState, useRef } from 'react';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

import '../LoginPage.css';

const SupplierSignupForm = ({ email, address, inputAddress, sendSignupData, handleClose }) => {
  
  const [isCorrect, setIsCorrect] = useState(true); //비밀번호 검증

  let idRef = useRef(null);
  let passwordRef = useRef(null);
  let confirmRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault(); //버튼을 눌러도 새로고침 되지않도록 함
    const userId = idRef.current.value;
    const password = passwordRef.current.value;
    const confirm = confirmRef.current.value;

    if (password === confirm) {
      const signupData = { email, userId, password, address };
      
      if ( email && userId && password && address ) {
        setIsCorrect(true);
        sendSignupData(signupData);
      } else {
        await Swal.fire({
          icon: 'warning',
          title: '입력되지 않은 정보가 있습니다!',
        })
      }
    } else {
      setIsCorrect(false);
    }
  }

  return(
    <>
      <Container>
        <Form onSubmit={onSubmit}>
          <Form.Group className="signup_inputArea" as={Row}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Google Email" 
              type="email"
              value={email}
              disabled
              autoFocus
            />
          </Form.Group>
          <Form.Group className="signup_inputArea" as={Row}>
            <Form.Label>ID</Form.Label>
            <Form.Control 
              type="id" 
              rows={1} 
              ref={idRef}/>
          </Form.Group>
          <Form.Group className="signup_inputArea" as={Row}>
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password"
              rows={1} 
              ref={passwordRef}
            />
          </Form.Group>
          <Form.Group className="signup_inputArea" as={Row}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password"
              rows={1} 
              ref={confirmRef}
            />
            <div>{isCorrect ? "" : "비밀번호가 일치하지 않습니다."}</div>
          </Form.Group>
          <Form.Group className="signup_inputArea" as={Row}>
            <Form.Label>WalletAddress</Form.Label>
            <Form.Control 
              type="id"
              value={address}
              disabled
              rows={1} 
            />
            <button
              type="button"
              onClick={inputAddress}
            >
              getAccount
            </button>
          </Form.Group>
          <Row>
            <Col className="signup_lowerArea">
              <Button 
                className="signup_button" 
                variant="primary" 
                type="submit"
              >
                SignUp
              </Button>
              <Button
                className="signup_close_button" 
                variant="secondary" 
                onClick={handleClose}
              >
                Close
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default SupplierSignupForm ;