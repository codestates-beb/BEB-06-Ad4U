import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../../hooks/axios/client';
import { myBucket, S3_BUCKET } from '../../../config/awsS3';
import { getLocalData } from '../../../config/localStrage';

import Avatar from 'react-avatar';
import { Container, Row, Col, Card, ListGroup, Form, Button, Modal } from 'react-bootstrap';
import swal from 'sweetalert';

import '../Client.css';

const ClientEditInfo = ({ userData, show, setShow }) => {
  const [newIntro, setNewIntro] = useState("");
  const [newProfileImgUrl, setNewProfileImgUrl] = useState("");
  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');

  const { id, userId, company_name, company_number, email, intro, profileImgUrl } = userData;

  const uploadFile = (e) => {
    const file = e.target.files[0];

    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name
    };
    
    myBucket.upload(params, (err, data) => {
      if (err) return alert("File upload is fail!");
      console.log(`File uploaded successfully. ${data.Location}`);
      setNewProfileImgUrl(data.Location);
    });
  }

  const onSubmit = async (e) => {

    try {
      e.preventDefault(); //버튼을 눌러도 새로고침 되지않도록 함

      let imgUrl;
      newProfileImgUrl ? imgUrl = newProfileImgUrl : imgUrl = profileImgUrl;
      
      const result = await client.inputInfo(accessToken, isClient, newIntro, imgUrl);
      if (result) {
        swal("성공적으로 수정되었습니다.");
        window.location.reload();
      } 
    } catch (err) {
      console.log(err.response.data);
      alert("fail!");
    }
  }

  return (
    <>
      <Modal 
        className="ClientInfo_container"
        as={Container} 
        show={show} 
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{userId}님의 정보수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Row>
              { newProfileImgUrl
              ? <Avatar src={newProfileImgUrl} alt="profile_img" />
              : <Avatar src={profileImgUrl} alt="profile_img" />}
              <Form.Label>이미지 업로드</Form.Label>
              <Form.Control type="file" onChange={uploadFile}/>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>광고 내용</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={4} 
              defaultValue={intro}
              onChange={(e) => setNewIntro(e.target.value)}
              />
          </Form.Group>
          <button type="submit">저장하기</button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShow(false)}>취소하기</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ClientEditInfo;