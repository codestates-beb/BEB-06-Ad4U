import React, { useState, useRef, useEffect } from 'react';
import { decodeToken }from 'react-jwt';
import env from "react-dotenv";
import axios from 'axios';
import Signup from './component/Signup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';

const LoginPage = () => {

  const [getCode, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [isclient, setIsClient] = useState(false);

  let idRef = useRef(null);
  let passwordRef = useRef(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    console.log("authorizationCode", authorizationCode)
    if (authorizationCode) {
      const options = {
        url: "http://localhost:3001/users/auth",
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        withcredential: true,
        data:{code: authorizationCode}
      }
      axios.request(options)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  },[])

  const googleOath = async () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code`+
    `&access_type=offline`+
    `&state=state_parameter_passthrough_value`+
    `&include_granted_scopes=true`+
    `&client_id=${REACT_APP_CLIENT_ID}`+
    `&scope=openid%20profile%20email%20https://www.googleapis.com/auth/youtube.readonly`+
    `&redirect_uri=http://localhost:3000/login`;
    window.location.href=url;
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
          <Button 
            onClick={googleOath}
          >
            Google 계정으로 간편 로그인
          </Button>
          <Signup 
            email={email}
            show={show} 
            setShow={setShow}
          />
      </Container>
    </>
  );

}

export default LoginPage;g_state