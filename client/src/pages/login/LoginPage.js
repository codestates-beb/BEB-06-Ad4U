import React, { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import axios from 'axios';
import Signup from './component/Signup';
import LoginForm  from './component/LoginForm';

import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const LoginPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);

  const handleIsClient = (e) => {
    if (e === "client") {
      setIsClient(true);
    } else setIsClient(false);
  }

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    console.log("authorizationCode", authorizationCode)
    if (authorizationCode) {
      const options = {
        url: "http://localhost:3001/users/auth",
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        withcredentials: true,
        data:{ code: authorizationCode }
      }
      axios.request(options)
        .then(res => {
          setEmail("email");
          console.log(res)
        })
        .catch(err => console.log(err))
    }
  },[]);

  const googleOath = async () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code`+
    `&access_type=offline`+
    `&state=state_parameter_passthrough_value`+
    `&include_granted_scopes=true`+
    `&client_id=${process.env.REACT_APP_CLIENT_ID}`+
    `&scope=openid%20profile%20email%20https://www.googleapis.com/auth/youtube.readonly`+
    `&redirect_uri=http://localhost:3000/login`;
    window.location.href=url;
  }

  const sendLoginData = async (loginData) => {
    loginData.isClient = isClient;
    console.log("LoginData", loginData);

    const { id, password } = loginData;
    const options = {
      url: "http://localhost:3001/users/login",
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      withcredential: true,
      data:{ id, password, isClient }
    }
    // const result = await axios.request(options)
  }
      
  return (
    <>
      <Container>
        <Tabs
          defaultActiveKey="supplier"
          className="mb-3"
          onSelect={handleIsClient}
          justify
        >
          <Tab 
            eventKey="supplier" 
            title="크리에이터"
          >
            <LoginForm sendLoginData={sendLoginData}/>
          </Tab>
          <Tab 
            eventKey="client" 
            title="광고주"
          >
            <LoginForm sendLoginData={sendLoginData} />
          </Tab>
        </Tabs>
        <div>또는</div>
        <Button onClick={googleOath}>
          Google 계정으로 간편 로그인
        </Button>
        <Signup 
          email={email}
          show={show} 
          setShow={setShow}
        />
        <Button onClick={() => setShow(true)}>SignupTest</Button>
      </Container>
    </>
  );
}


export default LoginPage;