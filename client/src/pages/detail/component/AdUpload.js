import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import './AdUpload.css';

import { myBucket, S3_BUCKET } from '../../../config/awsS3';
import axios from 'axios';


const AdUpload = () => {

  const [modalShow, setModalShow] = useState(false);

  const [AdInfo, setAdInfo] = useState({
    title : "",
    content : "",
    cost : "",
    imgUrl : "",
    isClient : true
  });


  useEffect(() => {
    console.log(AdInfo);
  },[AdInfo])

  const handleAdTitle = async (e) => {
    AdInfo.title = e.target.value;
    setAdInfo(AdInfo)
  }

  const handleAdContent = async (e) => {
    AdInfo.content = e.target.value;
    setAdInfo(AdInfo)
  }

  const handleAdCost = async (e) => {
    AdInfo.cost = e.target.value;
    setAdInfo(AdInfo)
  }

  const handleFileInput = async (e) => {
    await uploadFile(e.target.files[0]);
  }

  const uploadFile = (file) => {

      const params = {
          ACL: 'public-read',
          Body: file,
          Bucket: S3_BUCKET,
          Key: file.name
      };
      

      myBucket.upload(params, function (err, data) {
        console.log(data)
        if (err) {
            throw err
        }
        console.log(`File uploaded successfully.`);
        AdInfo.imgUrl = data.Location;
        setAdInfo(AdInfo)
      });
  }

  const handleSubmit = async () => {
    const options = {
        url: "http://localhost:3001/ad/create",
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        data:{ 
            title: AdInfo.title,
            content: AdInfo.content,
            AdImgUrl: AdInfo.imgUrl,
            cost: AdInfo.cost,
            isClient: true
        }
      }
      axios.request(options)
        .then(res => {
          if(res.status == 400) {

          }
          else {
            
          }
        })
        .catch(err => console.log(err))
    }

  

  return (
    <Form>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>이미지 업로드</Form.Label>
        <Form.Control type="file" onChange={handleFileInput}/>
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
      <Button variant="primary" type="submit" onClick={handleSubmit}>
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
        <img src={AdInfo.imgUrl} className="adImg"/>
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