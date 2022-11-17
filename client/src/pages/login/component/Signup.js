import React, { useState, useRef } from 'react';
import axios from 'axios';
import SignupForm  from './SignupForm'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const SignUp = ({ show, setShow, email }) => {
  const [isClient, setIsClient] = useState(false);

  const handleClose = () => setShow(false);

  const handleIsClient = (e) => {
    if (e === "client") {
      setIsClient(true);
    } else setIsClient(false);
  }
  
  const sendSignupData = async (signupData) => {
    signupData.isClient = isClient;
    console.log("SignupData", signupData);

    const { email, id, password, address } = signupData;
    const options = {
      url: "http://localhost:3001/users/signup",
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      withcredential: true,
      data:{ email, id, password, address, isClient }
    }
    // const result = await axios.request(options)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>SignUp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <SignupForm email={email} sendSignupData={sendSignupData}/>
          </Tab>
          <Tab 
            eventKey="client" 
            title="광고주"
          >
            <SignupForm email={email} sendSignupData={sendSignupData}/>
          </Tab>
        </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}

export default SignUp;