import React, { useState, useRef } from 'react';
import auth from '../../../hooks/axios/auth';
import SupplierSignupForm  from './SupplierSignupForm';
import ClientSignupForm  from './ClientSignupForm';
import { loadWeb3, getCurrentAccount } from '../../../hooks/web3/common';

import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Swal from 'sweetalert2'

import '../LoginPage.css';

const SignUp = ({ show, setShow, email }) => {
  const [isClient, setIsClient] = useState(false);
  const [address, setAddress] = useState("")

  const handleClose = () => setShow(false);

  const handleIsClient = (e) => {
    if (e === "client") {
      setIsClient(true);
    } else setIsClient(false);
  }

  const inputAddress = async () => {
    await loadWeb3();
    const currentAddress = await getCurrentAccount();
    setAddress(currentAddress);
  }

  const sendSignupData = async (signupData) => {
    signupData.isClient = isClient;
    console.log("SignupData", signupData);
    try {
      const result = await auth.signup(signupData);
      if (result) {
        await Swal.fire({
          icon: 'success',
          title: '회원가입 완료!',
        })
        handleClose();
      }
    } catch (err) {
      await Swal.fire({
        icon: 'error',
        title: '회원가입 실패..',
      })
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
              address={address}
              inputAddress={inputAddress}
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
              // address={address}
              // inputAddress={inputAddress} 
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