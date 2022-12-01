import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
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
          <Form.Group className="signup_inputArea">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              placeholder="Google Email" 
              type="email"
              value={email}
              disabled
            />
          </Form.Group>
          <Form.Group className="signup_inputArea">
            <Form.Label>아이디</Form.Label>
            <Form.Control 
              type="id" 
              rows={1} 
              ref={idRef}/>
          </Form.Group>
          <Form.Group className="signup_inputArea">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control 
              type="password"
              rows={1} 
              ref={passwordRef}
            />
          </Form.Group>
          <Form.Group className="signup_inputArea">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control 
              type="password"
              rows={1} 
              ref={confirmRef}
            />
            <div>{isCorrect ? "" : "비밀번호가 일치하지 않습니다."}</div>
          </Form.Group>
          <Form.Group className="signup_inputArea">
            <Form.Label>이더리움 계정</Form.Label>
            <Row>
              <Col xl={9}>
                <Form.Control 
                  className='signup_walletInput'
                  type="id"
                  value={address}
                  disabled
                  rows={1} 
                />
              </Col>
              <Col xl={3}>
                <Button
                  className='signup_walletButton'
                  variant="secondary"
                  onClick={inputAddress}
                >
                  가져오기
                </Button>
              </Col>
            </Row>
          </Form.Group>
          <Row className="signup_lowerArea" >
            <Col xl={4}/>
            <Col xl={4}>
              <button 
                className="signup_button" 
                type="submit"
              >
                가입하기
              </button>
            </Col>
            <Col xl={4}/>
          </Row>
        </Form>
      </Container>
    </>
  )
}

export default SupplierSignupForm ;