import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Emptypage = () => {
  const navigate = useNavigate();

  return (
    <Modal.Dialog 
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>Invaild Access</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>비정상적인 접근입니다.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => navigate('/')}>메인으로 돌아가기</Button>
      </Modal.Footer>
    </Modal.Dialog>
  );
}

export default Emptypage;