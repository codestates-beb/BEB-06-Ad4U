import React, { useState, useRef } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { decodeToken }from 'react-jwt';
import env from "react-dotenv";
import Signup from './Signup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';

const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [isclient, setIsClient] = useState(false);

  let idRef = useRef(null);
  let passwordRef = useRef(null);

  const onSuccess = async(res) => {
    const token = decodeToken(res.credential);
    console.log(token);
    setEmail(token.email);
    setShow(true);
  }

  const onError = (error) => {
    alert(error);
  }

  const onSubmit = async (e) => {
    const id = idRef.current.value;
    const password = passwordRef.current.value;

    e.preventDefault(); //버튼을 눌러도 새로고침 되지않도록 함
    if (id && password) {
      console.log(id)
      console.log(password)
      // axios({
      //   url: ""
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     id,
      //     password,
      //   })
      // })
      // .then(res => {
      //     navigate('/mypage');
      // })
      // .catch(err => alert(err));
    }
  }

  return (
    <>
      <Container>
        <GoogleOAuthProvider clientId={env.OATH_CLIENTID}>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control 
               rows={1} 
               type="password"
               placeholder="Password"
               ref={passwordRef}
              />
            </Form.Group>
            <Button variant="primary" type='submit'>
              LogIn
            </Button>
          </Form>
          <div>또는</div>
          <GoogleLogin 
            onSuccess={(e) => onSuccess(e)}
            onError={(e) => onError(e)}
          />
          <Signup 
            email={email}
            show={show} 
            setShow={setShow}
          />
        </GoogleOAuthProvider>
      </Container>
    </>
  );

}

export default LoginPage;