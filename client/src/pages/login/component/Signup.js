import React, { useState, useRef } from 'react';
import axios from 'axios';
import SupplierSignupForm  from './SupplierSignupForm';
import ClientSignupForm  from './ClientSignupForm';
import { loadWeb3, getCurrentAccount } from '../../../hooks/web3/common';

import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import '../LoginPage.css';

const SignUp = ({ show, setShow, email }) => {
  const [isClient, setIsClient] = useState(false);
  const [account, setAccount] = useState("")

  const handleClose = () => setShow(false);

  const handleIsClient = (e) => {
    if (e === "client") {
      setIsClient(true);
    } else setIsClient(false);
  }

  const inputAccount = async () => {
    await loadWeb3();
    const currentAccount = await getCurrentAccount();
    setAccount(currentAccount);
  }

  const sendSignupData = async (signupData) => {
    signupData.isClient = isClient;
    console.log("SignupData", signupData);
    try {
      const options = {
        url: "http://localhost:3001/users/signup",
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        withcredential: true,
        data: signupData
      }
      const result = await axios.request(options);
      if (result) {
        alert("회원가입이 완료되었습니다. 로그인을 해주세요");
        handleClose();
      }
    } catch (err) {
      alert(err.response.data);
    }
  }

  return (
    <>
      <Modal 
        className="signup_container"
        as={Container} 
        show={show} 
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>SignUp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Tabs
          defaultActiveKey="supplier"
          className="signup_tab"
          onSelect={handleIsClient}
          justify
        >
          <Tab 
            eventKey="supplier" 
            title="크리에이터"
          >
            <SupplierSignupForm 
              email={email} 
              account={account}
              inputAccount={inputAccount}
              sendSignupData={sendSignupData}
              handleClose={handleClose}
            />
          </Tab>
          <Tab 
            eventKey="client" 
            title="광고주"
          >
            <ClientSignupForm 
              email={email}
              account={account}
              inputAccount={inputAccount} 
              sendSignupData={sendSignupData}
              handleClose={handleClose}
            />
          </Tab>
        </Tabs>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );

}

export default SignUp;