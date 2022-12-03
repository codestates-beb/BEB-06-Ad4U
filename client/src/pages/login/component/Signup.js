import React, { useState } from 'react';
import auth from '../../../hooks/axios/auth';
import SupplierSignupForm  from './SupplierSignupForm';
import ClientSignupForm  from './ClientSignupForm';
import { loadWeb3, getCurrentAccount } from '../../../hooks/web3/common';
import { getLocalData, removeLocalData } from '../../../config/localStrage';
import confetti from 'canvas-confetti';
import Swal from 'sweetalert2'

import { Container, Modal, Tab, Tabs } from 'react-bootstrap';
import '../LoginPage.css';

const SignUp = ({ show, setShow, email }) => {
  const [address, setAddress] = useState("")
  const oathSignup = getLocalData('oathSignup');

  const handleClose = () => setShow(false);

  const inputAddress = async () => {
    await loadWeb3();
    const currentAddress = await getCurrentAccount();
    setAddress(currentAddress);
  }

  const sendSignupData = async (signupData) => {
    signupData.isClient = JSON.parse(oathSignup);
    console.log("SignupData", signupData);
    try {
      const result = await auth.signup(signupData);
      if (result) {
        removeLocalData("oathSignup");
        Swal.fire({
          icon: 'success',
          title: '회원가입 완료!',
        }).then(res => {
          handleClose();
          setTimeout(shoot, 0);
          setTimeout(shoot, 100);
          setTimeout(shoot, 200);
          setTimeout(shoot, 300);
        })
      }
    } catch (err) {
      removeLocalData("oathSignup");
      await Swal.fire({
        icon: 'error',
        title: '회원가입 실패..',
      })
    }
  }

  const shoot = () => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ['star'],
      colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
    };

    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star']
    });
  
    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle']
    });
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
          {oathSignup === "false"
            ? <SupplierSignupForm 
                email={email} 
                address={address}
                inputAddress={inputAddress}
                sendSignupData={sendSignupData}
              />
            : <ClientSignupForm 
                email={email}
                sendSignupData={sendSignupData}
              />}
        </Modal.Body>
      </Modal>
    </>
  );

}

export default SignUp;