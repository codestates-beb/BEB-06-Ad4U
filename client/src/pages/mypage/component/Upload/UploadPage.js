import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';

import { myBucket, S3_BUCKET } from '../../../../config/awsS3';
import {exchange} from '../../../../hooks/axios/coinGecko';

import { Button, Dropdown, Form, InputGroup, Modal }from 'react-bootstrap';

import './UploadPage.css';

const UploadPage = () => {

  const [modalShow, setModalShow] = useState(false);
  const [vsCurrencies, setVsCurrencies] = useState("krw");
  const [ethPrice, setEthPrice] = useState(0);
  const [curCost, setCurCost] = useState("");
  const [AdInfo, setAdInfo] = useState({
    title: "",
    content: "",
    cost: "",
    imgUrl: "https://beb-project3-s3-bucket.s3.ap-northeast-2.amazonaws.com/favicon.png",
    isClient: true
  });

  const navigate = useNavigate();

  useEffect(() => {
    vsChange(curCost)
  }, [vsCurrencies])

  useEffect(() => { }, [AdInfo, ethPrice])

  const handleAdTitle = async (e) => {
    AdInfo.title = e.target.value;
    setAdInfo(AdInfo)
  }

  const handleAdContent = async (e) => {
    AdInfo.content = e.target.value;
    setAdInfo(AdInfo)
  }

  const handleAdCost = async (e) => {
    setCurCost(e.target.value);
    var toEth = await exchange(e.target.value, vsCurrencies);
    setEthPrice(toEth);
    AdInfo.cost = toEth;
    setAdInfo(AdInfo)
  }

  const vsChange = async (curCost) => {
    var toEth = await exchange(curCost,vsCurrencies);
    setEthPrice(toEth);
    AdInfo.cost = toEth
    setAdInfo(AdInfo)
  }

  const uploadFile = (e) => {
    const file = e.target.files[0]
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name
    };

    myBucket.upload(params, async function (err, data) {
      console.log(data)
      if (err) {
        await Swal.fire({
          icon: 'error',
          title: '파일 업로드 실패...',
        })
      }

      AdInfo.imgUrl = data.Location;
      setAdInfo(AdInfo)
    });
  }

  const preview = async (e) => {
    e.preventDefault();
    var checkVaild = 0;
    console.log(AdInfo.content)

    if (AdInfo.content.length === 0) {
      document.getElementById("content-message").style.display = "block";
      checkVaild++;
    } else {
      document.getElementById("content-message").style.display = "none";
    }

    if (AdInfo.cost === 0) {
      document.getElementById("cost-message").style.display = "block";
      checkVaild++;
    } else {
      document.getElementById("cost-message").style.display = "none";
    }

    if (AdInfo.title.length === 0) {
      document.getElementById("title-message").style.display = "block";
      checkVaild++;
    } else {
      document.getElementById("title-message").style.display = "none";
    }

    if (checkVaild > 0) {
      return;
    } else {
      setModalShow(true);
    }
  }

  const handleSubmit = async () => {
    setModalShow(false)
    console.log(AdInfo.imgUrl);
    var accessToken = window.localStorage.getItem('accessToken');
    const options = {
      url: "http://localhost:3001/ad/create",
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
      data: {
        title: AdInfo.title,
        content: AdInfo.content,
        AdImgUrl: AdInfo.imgUrl,
        cost: AdInfo.cost,
        isClient: true
      }
    }
    axios.request(options)
      .then(async (res) => {
        if (res.status == 201) {
          await Swal.fire({
            icon: 'success',
            title: '광고 업로드 완료!',
          })
          navigate(`/mypage/client`)
          window.location.reload();
        }
        else {
          await Swal.fire({
            icon: 'error',
            title: '광고 업로드 실패..',
          })
        }
      })
  }

  return (
    <Form className='form'>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label><h5>이미지 업로드</h5></Form.Label>
        <Form.Control type="file" onChange={uploadFile} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAdTitle">
        <Form.Label><h5>광고 제목<span className="alert"> *</span></h5></Form.Label>
        <Form.Control type='text' placeholder="Enter Advertisement Title" onChange={handleAdTitle} />
      </Form.Group>
      <p id="title-message" className="titleMessage">Title Field Required!!</p>

      <Form.Group>
        <Form.Label><h5>제안 금액<span className="alert"> *</span></h5></Form.Label>
        <InputGroup className="mb-3">
          <Form.Control type='text' placeholder="Enter Advertisement Cost" onChange={handleAdCost} />
          <Dropdown>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
              {vsCurrencies.toUpperCase()}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
              <Dropdown.Item onClick={() => setVsCurrencies("krw")}>KRW</Dropdown.Item>
              <Dropdown.Item onClick={() => setVsCurrencies("usd")}>USD</Dropdown.Item>
              <Dropdown.Item onClick={() => setVsCurrencies("eur")}>EUR</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <img src='https://beb-project3-s3-bucket.s3.ap-northeast-2.amazonaws.com/exchange.png' className='exchange'></img>
          <Form.Control type='text' placeholder={ethPrice} disabled></Form.Control>
          <InputGroup.Text id="basic-addon2">ETH</InputGroup.Text>
        </InputGroup>
      </Form.Group>
      <p id="cost-message" className="costMessage">Cost Field Required!!</p>

      <Form.Group className="mb-3" controlId="formAdContent">
        <Form.Label><h5>광고 내용<span className="alert"> *</span></h5></Form.Label>
        <Form.Control as="textarea" placeholder="Enter Your Advertisement Info" rows={10} onChange={handleAdContent} />
      </Form.Group>
      <p id="content-message" className="contentMessage">Content Field Required!!</p>

        <Button variant="primary" onClick={preview}>
          미리보기
        </Button>

      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            {AdInfo.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={AdInfo.imgUrl} className="adImg" alt='adImg'/>
          <h4>제안 금액 : {AdInfo.cost} ETH</h4>
          <br></br>
          <p className='aDContent'>{AdInfo.content}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
}

export default UploadPage;