import React from 'react';

import Avatar from 'react-avatar';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap/esm';

import '../../Client.css';

//info랑 합쳐놓으면 onchange가 제대로 작동하지 않아서 edit 부분만 따로 파일로 빼서 import함.
const EditUserData = ({ userData, setNewIntro, newProfileImgUrl, uploadFile, onSubmit, setIsEdit, setShowPreview}) => {

  const { userId, intro, profileImgUrl } = userData;

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{userId}님의 정보</Modal.Title>
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
        <button onClick={() => setShowPreview(true)}>미리보기</button>
        <button onClick={() => setIsEdit(false)}>취소하기</button>
      </Modal.Footer>
    </>
  );
}

export default EditUserData;