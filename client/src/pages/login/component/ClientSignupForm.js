import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';

import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../LoginPage.css';

const ClientSignupForm = ({ email, sendSignupData, handleClose }) => {
  
  const [isCorrect, setIsCorrect] = useState(true); //비밀번호 검증

  let idRef = useRef(null);
  let passwordRef = useRef(null);
  let confirmRef = useRef(null);
  let company_nameRef = useRef(null);
  let company_numberRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault(); //버튼을 눌러도 새로고침 되지않도록 함
    const userId = idRef.current.value;
    const password = passwordRef.current.value;
    const confirm = confirmRef.current.value;
    const company_name = company_nameRef.current.value;
    const company_number = company_numberRef.current.value;

    if (password === confirm) {
      const signupData = { email, userId, password, company_name, company_number };

      if ( email && userId && password && company_name && company_number) {
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
            <Form.Label>이메일</Form.Label>
            <Form.Control
              placeholder="Google Email" 
              type="email"
              value={email}
              rows={1}
              disabled
            />
          </Form.Group>
          <Form.Group className="signup_inputArea" as={Row}>
            <Form.Label>아이디</Form.Label>
            <Form.Control 
              type="id" 
              rows={1} 
              ref={idRef}/>
          </Form.Group>
          <Form.Group className="signup_inputArea" as={Row}>
            <Form.Label>비밀번호</Form.Label>
            <Form.Control 
              type="password"
              rows={1} 
              ref={passwordRef}
            />
          </Form.Group>
          <Form.Group className="signup_inputArea" as={Row}>
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control 
              type="password"
              rows={1} 
              ref={confirmRef}
            />
            <div>{isCorrect ? "" : "비밀번호가 일치하지 않습니다."}</div>
          </Form.Group>
          <Form.Group className="signup_inputArea" as={Row}>
            <Form.Label>회사명</Form.Label>
            <Form.Control 
              type="text"
              rows={1} 
              ref={company_nameRef}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="signup_inputArea" as={Row}>
            <Form.Label>사업자번호</Form.Label>
            <Form.Control 
              type="id"
              rows={1} 
              ref={company_numberRef}
            />
          </Form.Group>
          <Row className="signup_lowerArea">
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

export default ClientSignupForm;