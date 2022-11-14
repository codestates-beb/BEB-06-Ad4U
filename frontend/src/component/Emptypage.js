import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import { Stack, ToastContainer } from 'react-bootstrap';

const Emptypage = () => {
  const navigate = useNavigate();

  return (
    // <Modal.Dialog 
    //   size="lg"
    // >
    //   <Modal.Header>
    //     <Modal.Title>Invaild Access</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <p>비정상적인 접근입니다.</p>
    //   </Modal.Body>
    //   <Modal.Footer>
    //     <Button onClick={() => navigate('/')}>메인으로 돌아가기</Button>
    //   </Modal.Footer>
    // </Modal.Dialog>
  <ToastContainer className="p-3" position="middle-center">
    <Toast >
      <Toast.Header closeButton={false}>
        <strong className="me-auto">Team4U</strong>
      </Toast.Header>
      <Toast.Body className='col text-center'>비정상적인 접근입니다.</Toast.Body>
      <Toast.Body className='col text-center'>
        <Button size="sm" onClick={() => navigate('/')}>메인으로 돌아가기</Button>
      </Toast.Body>
    </Toast>
    </ToastContainer>
  );
}

export default Emptypage;