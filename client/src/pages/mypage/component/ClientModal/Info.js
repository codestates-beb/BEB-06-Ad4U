import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../../../hooks/axios/client';
import EditUserData from './Edit';
import { myBucket, S3_BUCKET } from '../../../../config/awsS3';
import { getLocalData } from '../../../../config/localStrage';

import Avatar from 'react-avatar';
import { Container, Row, Col, Card, ListGroup, Form, Button, Modal } from 'react-bootstrap';

import '../../Client.css';

const ClientInfo = ({ userData, show, setShow }) => {
  const [newIntro, setNewIntro] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
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
        alert("성공적으로 수정되었습니다.");
        window.location.reload();
      } 
    } catch (err) {
      console.log(err.response.data);
      alert("fail!");
    }
  }

  const ShowUserData = () => {
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>{userId}님의 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Avatar src={profileImgUrl} alt="profile_img" /> 
          <div>회사명{company_name}</div>
          <div>사업자번호{company_number}</div>
          <div>이메일{email}</div>
          <div>회사소개</div>
          <div>{intro}</div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setIsEdit(true)}>나의 정보수정하기</button>
        </Modal.Footer>
      </>
    );
  }

  /* 미리보기 */
  const Preview = () => {
    return (
      <>
        <Modal 
          className="ClientInfoPreview_container"
          as={Container} 
          show={showPreview} 
          onHide={() => setShowPreview(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>{userId}님의 정보</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {newProfileImgUrl
            ? <Avatar src={newProfileImgUrl} alt="profile_img" /> 
            : <Avatar src={profileImgUrl} alt="profile_img" />}
            <div>회사명{company_name}</div>
            <div>사업자번호{company_number}</div>
            <div>이메일{email}</div>
            <div>회사소개</div>
            <div>{newIntro}</div>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Modal 
        className="ClientInfo_container"
        // as={Container} 
        show={show} 
        onHide={() => setShow(false)}
      >
        { isEdit 
        ? <EditUserData  
          userData={userData}
          setNewIntro={setNewIntro} 
          newProfileImgUrl={newProfileImgUrl}
          uploadFile={uploadFile} 
          onSubmit={onSubmit} 
          setIsEdit={setIsEdit}
          setShowPreview={setShowPreview}
          />
        : <ShowUserData />}
      </Modal>
      <Preview />
    </>
  );
}

export default ClientInfo;