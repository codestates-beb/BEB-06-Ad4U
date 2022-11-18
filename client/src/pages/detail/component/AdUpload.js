import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import './AdUpload.css';

// import { myBucket, S3_BUCKET } from '../../../config/awsS3';
import axios from 'axios';


const AdUpload = () => {

  const [modalShow, setModalShow] = useState(false);

  const [AdInfo, setAdInfo] = useState({
    title : "",
    content : "",
    cost : "",
    imgUrl : "https://beb-project3-s3-bucket.s3.ap-northeast-2.amazonaws.com/favicon.png",
    isClient : true
  });

  const [vsCurrencies, setVsCurrencies] = useState("krw");
  const [ethPrice,setEthPrice] = useState(0);
  const [curCost, setCurCost] = useState("");

  useEffect(() => {
    vsChange(curCost)
  },[vsCurrencies])

  useEffect(() => {},[AdInfo,ethPrice])

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
    const cost =  e.target.value;
    const coinGeckoUrl = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${vsCurrencies}`;
    const options = {
      url: coinGeckoUrl,
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    }
    var toEth = 0;
    await axios.request(options)
        .then(res => {
          if(vsCurrencies == "krw") {
            toEth = (1/res.data.ethereum.krw)*cost;
            console.log(toEth)
            setEthPrice(toEth)
          } else if (vsCurrencies == "usd") {
            toEth = (1/res.data.ethereum.usd)*cost;
            setEthPrice(toEth)
          } else if (vsCurrencies == "eur") {
            toEth = (1/res.data.ethereum.eur)*cost;
            setEthPrice(toEth)
          }
        })
        .catch(err => console.log(err))

    AdInfo.cost = toEth;
    setAdInfo(AdInfo)
  }

  const vsChange = async (curCost) => {
    const cost =  curCost;
    const coinGeckoUrl = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${vsCurrencies}`;
    const options = {
      url: coinGeckoUrl,
      method: 'GET',
      headers: {"Content-Type": "application/json"}
    }
    var toEth = 0;
    await axios.request(options)
        .then(res => {
          if(vsCurrencies == "krw") {
            toEth = (1/res.data.ethereum.krw)*cost;
            console.log(toEth)
            setEthPrice(toEth)
          } else if (vsCurrencies == "usd") {
            toEth = (1/res.data.ethereum.usd)*cost;
            setEthPrice(toEth)
          } else if (vsCurrencies == "eur") {
            toEth = (1/res.data.ethereum.eur)*cost;
            setEthPrice(toEth)
          }
        })
        .catch(err => console.log(err))

    AdInfo.cost = toEth;
    setAdInfo(AdInfo)
  }

  const handleFileInput = async (e) => {
    await uploadFile(e.target.files[0]);
  }

  const uploadFile = (file) => {

      const params = {
          ACL: 'public-read',
          Body: file,
          // Bucket: S3_BUCKET,
          Key: file.name
      };
      

      // myBucket.upload(params, function (err, data) {
      //   console.log(data)
      //   if (err) {
      //       throw err
      //   }
      //   console.log(`File uploaded successfully.`);
      //   AdInfo.imgUrl = data.Location;
      //   setAdInfo(AdInfo)
      // });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    //AdInfo 유효성 검사
    var checkVaild = 0;
    
    if(AdInfo.content.length === 0) {
        document.getElementById("content-message").style.display = "block";
        checkVaild++;
    }
    if(AdInfo.cost.length === 0) {
        document.getElementById("cost-message").style.display = "block";
        checkVaild++;
    }
    if(AdInfo.title.length === 0) {
        document.getElementById("title-message").style.display = "block";
        checkVaild++;
    }

    if(checkVaild > 0) {
        return;
    }
    // test용 access Token
    var accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0IiwiaWF0IjoxNjY4NzQ1ODA2LCJleHAiOjE2Njg3NDk0MDZ9.lXCyyuq6t-RCuEUf3oDb6arOA69_9IoSPB5p8SNKrNc";
    const options = {
        url: "http://localhost:3001/ad/create",
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
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
          // 에러 로직
        }
        else {
          // 성공 로직
        }
        })
        .catch(err => console.log(err))

  }

  return (
    <Form className='form'>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label><h5>이미지 업로드</h5></Form.Label>
        <Form.Control type="file" onChange={handleFileInput}/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formAdTitle">
        <Form.Label><h5>광고 제목<span className="red"> *</span></h5></Form.Label>
        <Form.Control type='text' placeholder="Enter Advertisement Title" onChange={handleAdTitle}/>
      </Form.Group>
      <p id="title-message" className="titleMessage">Title Field Required!!</p>
      
      <Form.Group>
        <Form.Label><h5>제안 금액<span className="red"> *</span></h5></Form.Label>
        <InputGroup className="mb-3">
            <Form.Control type='text' placeholder="Enter Advertisement Cost" onChange={handleAdCost}/>
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
        <p id="cost-message" className="costMessage">Cost Field Required!!</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAdContent">
        <Form.Label><h5>광고 내용<span className="red"> *</span></h5></Form.Label>
        <Form.Control as="textarea" placeholder="Enter Your Advertisement Info" rows={3} onChange={handleAdContent}/>
      </Form.Group>
      <p id="content-message" className="contentMessage">Content Field Required!!</p>

      <Button variant="primary" onClick={() => setModalShow(true)}>
        미리보기
      </Button>
      {/* <div>
        <button className='upload_btn' onClick={() => setModalShow(true)}><span>미리보기</span></button>
      </div> */}
      <br></br>
      <br></br>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      {/* <div>
        <button className='upload_btn' onClick={() => setModalShow(true)}><span>Submit</span></button>
      </div> */}


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