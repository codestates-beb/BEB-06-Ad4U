import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import './AdUpload.css';

const AdUpload = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const [AdInfo, setAdInfo] = useState({
    title : "",
    content : "",
    cost : ""
  });

  const handleAdTitle = async (e) => {
    AdInfo.title = e.target.value;
    setAdInfo(AdInfo)
    console.log(AdInfo)
  }

  const handleAdContent = async (e) => {
    AdInfo.content = e.target.value;
    setAdInfo(AdInfo)
    console.log(AdInfo)
  }

  const handleAdCost = async (e) => {
    AdInfo.cost = e.target.value;
    setAdInfo(AdInfo)
    console.log(AdInfo)
  }

  

  return (
    <Form>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAdTitle">
        <Form.Label>광고 제목</Form.Label>
        <Form.Control type='text' placeholder="Enter Advertisement Title" onChange={handleAdTitle}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>제안 금액</Form.Label>
        <InputGroup className="mb-3">
            <Form.Control type='text' placeholder="Enter Advertisement Cost" onChange={handleAdCost}/>
            <InputGroup.Text id="basic-addon2">ETH</InputGroup.Text>
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAdContent">
        <Form.Label>광고 내용</Form.Label>
        <Form.Control as="textarea" placeholder="Enter Your Advertisement Info" rows={3} onChange={handleAdContent}/>
      </Form.Group>
      
      <Button variant="primary" onClick={() => setModalShow(true)}>
        미리보기
      </Button>
      <br></br>
      <br></br>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>


      <Modal
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        
        <Modal.Title>
          {AdInfo.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>제안 금액 : {AdInfo.cost} ETH</h4>
        <p className='adContent'>{AdInfo.content}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    </Form>
    
  );
}

export default AdUpload;