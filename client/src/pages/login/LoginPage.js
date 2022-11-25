import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { decodeToken } from 'react-jwt';
import auth from '../../hooks/axios/auth'; 
import { setLocalData, getLocalData, clearLocalData } from '../../config/localStrage';
import Signup from './component/Signup';
import LoginForm  from './component/LoginForm';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import './LoginPage.css';

const LoginPage = ({ setUserData }) => {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleIsClient = (e) => {
    if (e === "client") {
      setIsClient(true);
    } else setIsClient(false);
  }

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    console.log("authorizationCode", authorizationCode);
    if (authorizationCode) {
      auth.oauth(authorizationCode)
        .then(res => {
          setEmail(res.data.email);
          setShow(true);
        })
        .catch(err => alert(err.response.data))
    }
  },[]);

  const googleOath = async () => {
    //서버에서 url을 받아와서 동의 페이지로 이동
    window.location.href = await auth.oauthLink();
  }

  const sendLoginData = async (loginData) => {
    loginData.isClient = isClient;
    console.log("LoginData", loginData);
    const { userId, password } = loginData;
    try { 
      if ( userId && password ) {
      const result = await auth.login(loginData);
        if (result) {
          const { user, jwt_accessToken, isClient } = result.data;  
          if (user && jwt_accessToken && typeof(isClient) === 'boolean') {   
            setLocalData("accessToken", jwt_accessToken);
            setLocalData("isClient", isClient);
            setUserData(user);
            navigate('/');
          }
        }
      } else {
        alert("아이디와 비밀번호를 입력해주세요");
      }
    } catch (err) {
      alert(err.response.data);
    }
  }
  
  return (
    <>
      <Container className='loginPage_container'>
        <Tabs
          as={Row}
          defaultActiveKey="supplier"
          onSelect={handleIsClient}
          // className="mb-3"
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
        <Row>
          <Button 
            as={Col}
            xs={{ span: 4, offset: 8 }}
            onClick={googleOath} 
          >
            Google 계정으로 간편회원가입
          </Button>
        </Row>
      </Container>
      <Signup 
          email={email}
          show={show} 
          setShow={setShow}
        />
    </>
  );
}


export default LoginPage;